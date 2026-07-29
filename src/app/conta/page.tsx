import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import {
  chamarLayvoApi,
  LAYVO_SESSION_COOKIE,
  type LayvoSession,
} from "@/lib/layvo-api";
import { LogoutButton } from "./logout-button";

export const metadata: Metadata = {
  title: "Minha conta",
  description: "Consulte sua conta Layvo.",
};

export const dynamic = "force-dynamic";

export default async function ContaPage() {
  const tokenSessao = (await cookies()).get(LAYVO_SESSION_COOKIE)?.value;
  if (!tokenSessao) redirect("/entrar?retorno=/conta");

  const sessao = await chamarLayvoApi<LayvoSession>("/v1/auth/sessao", {
    method: "POST",
    body: JSON.stringify({ tokenSessao }),
  }).catch(() => null);
  if (!sessao) redirect("/entrar?retorno=/conta");

  return (
    <>
      <SiteHeader />
      <main className="account-main">
        <section className="account-card">
          <span className="eyebrow"><i /> Minha conta</span>
          <div className="account-head">
            <div className="account-avatar">
              {(sessao.usuario.name || sessao.usuario.email || "L").charAt(0).toUpperCase()}
            </div>
            <div>
              <h1>{sessao.usuario.name || "Conta Layvo"}</h1>
              <p>{sessao.usuario.email}</p>
            </div>
          </div>
          <div className="account-info">
            <div><small>Produto</small><strong>Layvo Gestão</strong></div>
            <div><small>Status da conta</small><strong className="account-active">Ativa</strong></div>
          </div>
          {sessao.documentos?.aceiteNecessario ? (
            <p className="account-notice">
              Há documentos atualizados para revisar no aplicativo. Consulte também os{" "}
              <Link href="/termos-de-uso">Termos de Uso</Link> e a{" "}
              <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
            </p>
          ) : null}
          <div className="account-actions">
            <Link className="button primary" href="/produtos/layvo-gestao">Conhecer o produto</Link>
            <LogoutButton />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
