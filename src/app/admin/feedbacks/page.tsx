import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import {
  chamarLayvoApi,
  LAYVO_SESSION_COOKIE,
  LayvoApiError,
  type LayvoSession,
} from "@/lib/layvo-api";

export const metadata: Metadata = {
  title: "Feedbacks",
  description: "Painel interno de feedbacks dos produtos Layvo.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type StatusFeedback = "novo" | "em_analise" | "respondido" | "arquivado";
type TipoFeedback = "sugestao" | "problema" | "duvida";

type Feedback = {
  id: string;
  tipo: TipoFeedback;
  mensagem: string;
  incluirDiagnostico: boolean;
  diagnostico: unknown;
  status: StatusFeedback;
  criadoEm: string;
  atualizadoEm: string;
  empresa: { id: string; nome: string };
  usuario: { id: string; nome: string | null; email: string | null };
  produto: { codigo: string; nome: string } | null;
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const rotulosStatus: Record<StatusFeedback, string> = {
  novo: "Novo",
  em_analise: "Em análise",
  respondido: "Respondido",
  arquivado: "Arquivado",
};

const rotulosTipo: Record<TipoFeedback, string> = {
  sugestao: "Sugestão",
  problema: "Problema",
  duvida: "Dúvida",
};

function primeiroValor(valor: string | string[] | undefined) {
  return Array.isArray(valor) ? valor[0] : valor;
}

function formatarData(valor: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(valor));
}

function formatarDiagnostico(diagnostico: unknown) {
  if (!diagnostico) return "Diagnóstico não informado.";
  if (typeof diagnostico === "string") {
    try {
      return JSON.stringify(JSON.parse(diagnostico), null, 2);
    } catch {
      return diagnostico;
    }
  }
  return JSON.stringify(diagnostico, null, 2);
}

function PainelIndisponivel({ semPermissao = false }: { semPermissao?: boolean }) {
  return (
    <>
      <SiteHeader />
      <main className="feedback-admin-main">
        <section className="feedback-admin-empty feedback-admin-access">
          <span>{semPermissao ? "Acesso restrito" : "Painel indisponível"}</span>
          <h1>{semPermissao ? "Esta área é exclusiva da equipe Layvo." : "Não foi possível carregar os feedbacks."}</h1>
          <p>{semPermissao ? "Entre com a conta administradora autorizada para continuar." : "Tente novamente em alguns instantes."}</p>
          <Link className="button primary" href="/conta">Voltar para minha conta</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export default async function FeedbacksPage({ searchParams }: PageProps) {
  const tokenSessao = (await cookies()).get(LAYVO_SESSION_COOKIE)?.value;
  if (!tokenSessao) redirect("/entrar?retorno=/admin/feedbacks");

  const sessao = await chamarLayvoApi<LayvoSession>("/v1/auth/sessao", {
    method: "POST",
    body: JSON.stringify({ tokenSessao }),
  }).catch(() => null);
  if (!sessao) redirect("/entrar?retorno=/admin/feedbacks");

  const parametros = await searchParams;
  const status = primeiroValor(parametros.status) || "";
  const tipo = primeiroValor(parametros.tipo) || "";
  const busca = primeiroValor(parametros.busca)?.trim() || "";
  const consulta = new URLSearchParams();
  if (status) consulta.set("status", status);
  if (tipo) consulta.set("tipo", tipo);
  if (busca) consulta.set("busca", busca);

  let feedbacks: Feedback[];
  try {
    const dados = await chamarLayvoApi<{ feedbacks: Feedback[] }>(
      `/v1/admin/feedbacks${consulta.size ? `?${consulta.toString()}` : ""}`,
      { headers: { Authorization: `Bearer ${sessao.tokenAcesso}` } },
    );
    feedbacks = dados.feedbacks;
  } catch (erro) {
    if (erro instanceof LayvoApiError && erro.status === 403) {
      return <PainelIndisponivel semPermissao />;
    }
    return <PainelIndisponivel />;
  }

  const novos = feedbacks.filter((feedback) => feedback.status === "novo").length;
  const problemas = feedbacks.filter((feedback) => feedback.tipo === "problema").length;

  return (
    <>
      <SiteHeader />
      <main className="feedback-admin-main">
        <div className="feedback-admin-wrap">
          <header className="feedback-admin-heading">
            <div>
              <span className="eyebrow"><i /> Painel interno</span>
              <h1>Feedbacks dos usuários</h1>
              <p>Mensagens enviadas diretamente pelos aplicativos Layvo.</p>
            </div>
            <div className="feedback-admin-user">
              <small>Conectado como</small>
              <strong>{sessao.usuario.name || sessao.usuario.email}</strong>
            </div>
          </header>

          <section className="feedback-admin-stats" aria-label="Resumo dos feedbacks exibidos">
            <article><small>Exibidos</small><strong>{feedbacks.length}</strong></article>
            <article><small>Novos</small><strong>{novos}</strong></article>
            <article><small>Problemas</small><strong>{problemas}</strong></article>
          </section>

          <form className="feedback-admin-filters" method="get">
            <label>
              <span>Buscar</span>
              <input name="busca" defaultValue={busca} placeholder="Mensagem, empresa, nome ou e-mail" />
            </label>
            <label>
              <span>Tipo</span>
              <select name="tipo" defaultValue={tipo}>
                <option value="">Todos</option>
                <option value="sugestao">Sugestão</option>
                <option value="problema">Problema</option>
                <option value="duvida">Dúvida</option>
              </select>
            </label>
            <label>
              <span>Status</span>
              <select name="status" defaultValue={status}>
                <option value="">Todos</option>
                <option value="novo">Novo</option>
                <option value="em_analise">Em análise</option>
                <option value="respondido">Respondido</option>
                <option value="arquivado">Arquivado</option>
              </select>
            </label>
            <button className="button primary" type="submit">Filtrar</button>
            {(busca || tipo || status) ? <Link className="feedback-admin-clear" href="/admin/feedbacks">Limpar</Link> : null}
          </form>

          <section className="feedback-admin-list" aria-live="polite">
            {feedbacks.length === 0 ? (
              <div className="feedback-admin-empty">
                <span>Nenhum resultado</span>
                <h2>Não encontramos feedbacks com esses filtros.</h2>
                <p>Altere os filtros ou aguarde uma nova mensagem enviada pelo aplicativo.</p>
              </div>
            ) : feedbacks.map((feedback) => (
              <article className="feedback-admin-card" key={feedback.id}>
                <div className="feedback-admin-card-head">
                  <div className="feedback-admin-badges">
                    <span className={`feedback-admin-badge type-${feedback.tipo}`}>{rotulosTipo[feedback.tipo]}</span>
                    <span className={`feedback-admin-badge status-${feedback.status}`}>{rotulosStatus[feedback.status]}</span>
                  </div>
                  <time dateTime={feedback.criadoEm}>{formatarData(feedback.criadoEm)}</time>
                </div>
                <p className="feedback-admin-message">{feedback.mensagem}</p>
                <dl className="feedback-admin-meta">
                  <div><dt>Empresa</dt><dd>{feedback.empresa.nome}</dd></div>
                  <div><dt>Usuário</dt><dd>{feedback.usuario.nome || "Nome não informado"}<small>{feedback.usuario.email}</small></dd></div>
                  <div><dt>Produto</dt><dd>{feedback.produto?.nome || "Produto não informado"}<small>{feedback.produto?.codigo}</small></dd></div>
                </dl>
                {feedback.incluirDiagnostico ? (
                  <details className="feedback-admin-diagnostic">
                    <summary>Ver dados técnicos e logs</summary>
                    <pre>{formatarDiagnostico(feedback.diagnostico)}</pre>
                  </details>
                ) : null}
              </article>
            ))}
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
