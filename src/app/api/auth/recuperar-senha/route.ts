import { NextResponse } from "next/server";
import { chamarLayvoApi, respostaErro } from "@/lib/layvo-api";

export async function POST(request: Request) {
  try {
    const corpo = await request.json().catch(() => null) as {
      email?: string;
    } | null;
    const email = corpo?.email?.trim().toLowerCase();
    if (!email) {
      return NextResponse.json(
        { erro: { mensagem: "Informe um e-mail válido." } },
        { status: 422 },
      );
    }

    const dados = await chamarLayvoApi<{ mensagem: string }>(
      "/v1/auth/recuperar-senha",
      {
        method: "POST",
        body: JSON.stringify({ email }),
      },
    );
    return NextResponse.json(dados);
  } catch (erro) {
    return respostaErro(erro);
  }
}
