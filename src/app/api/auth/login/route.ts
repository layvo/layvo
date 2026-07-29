import { NextResponse } from "next/server";
import {
  chamarLayvoApi,
  LAYVO_SESSION_COOKIE,
  type LayvoSession,
  respostaErro,
} from "@/lib/layvo-api";

export async function POST(request: Request) {
  try {
    const corpo = await request.json().catch(() => null) as {
      email?: string;
      senha?: string;
    } | null;
    const email = corpo?.email?.trim().toLowerCase();
    const senha = corpo?.senha;

    if (!email || !senha) {
      return NextResponse.json(
        { erro: { mensagem: "Informe seu e-mail e sua senha." } },
        { status: 422 },
      );
    }

    const sessao = await chamarLayvoApi<LayvoSession>("/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, senha }),
    });
    const resposta = NextResponse.json({
      usuario: sessao.usuario,
      documentos: sessao.documentos,
    });

    resposta.cookies.set(LAYVO_SESSION_COOKIE, sessao.tokenSessao || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return resposta;
  } catch (erro) {
    return respostaErro(erro);
  }
}
