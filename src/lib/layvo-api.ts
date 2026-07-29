export const LAYVO_SESSION_COOKIE = "layvo_site_session";

const API_BASE_URL = (
  process.env.LAYVO_API_URL ||
  "https://layvo-platform-api.layvo-platform.workers.dev"
).replace(/\/$/, "");

export type LayvoUser = {
  id: string;
  name?: string | null;
  email?: string | null;
};

export type LayvoSession = {
  tokenSessao?: string;
  tokenAcesso: string;
  usuario: LayvoUser;
  documentos?: {
    aceiteNecessario?: boolean;
  };
};

export class LayvoApiError extends Error {
  status: number;
  codigo?: string;

  constructor(message: string, status: number, codigo?: string) {
    super(message);
    this.name = "LayvoApiError";
    this.status = status;
    this.codigo = codigo;
  }
}

export async function chamarLayvoApi<T>(
  caminho: string,
  init: RequestInit = {},
): Promise<T> {
  const resposta = await fetch(`${API_BASE_URL}${caminho}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
    cache: "no-store",
  });
  const dados = resposta.status === 204
    ? null
    : await resposta.json().catch(() => null);

  if (!resposta.ok) {
    const erro = dados as {
      erro?: { mensagem?: string; codigo?: string };
    } | null;
    throw new LayvoApiError(
      erro?.erro?.mensagem || "Não foi possível concluir esta operação.",
      resposta.status,
      erro?.erro?.codigo,
    );
  }

  return dados as T;
}

export function respostaErro(erro: unknown) {
  if (erro instanceof LayvoApiError) {
    return Response.json(
      { erro: { mensagem: erro.message, codigo: erro.codigo } },
      { status: erro.status },
    );
  }

  return Response.json(
    { erro: { mensagem: "Não foi possível conectar ao servidor Layvo." } },
    { status: 503 },
  );
}
