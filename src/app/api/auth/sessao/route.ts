import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  chamarLayvoApi,
  LAYVO_SESSION_COOKIE,
  type LayvoSession,
  respostaErro,
} from "@/lib/layvo-api";

export async function GET() {
  const cookieStore = await cookies();
  const tokenSessao = cookieStore.get(LAYVO_SESSION_COOKIE)?.value;
  if (!tokenSessao) {
    return NextResponse.json(
      { erro: { mensagem: "Você não está autenticado." } },
      { status: 401 },
    );
  }

  try {
    const sessao = await chamarLayvoApi<LayvoSession>("/v1/auth/sessao", {
      method: "POST",
      body: JSON.stringify({ tokenSessao }),
    });
    return NextResponse.json({
      usuario: sessao.usuario,
      documentos: sessao.documentos,
    });
  } catch (erro) {
    const resposta = respostaErro(erro);
    if (resposta.status === 401) {
      cookieStore.delete(LAYVO_SESSION_COOKIE);
    }
    return resposta;
  }
}
