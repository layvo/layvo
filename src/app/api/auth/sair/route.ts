import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  chamarLayvoApi,
  LAYVO_SESSION_COOKIE,
} from "@/lib/layvo-api";

export async function POST() {
  const cookieStore = await cookies();
  const tokenSessao = cookieStore.get(LAYVO_SESSION_COOKIE)?.value;
  cookieStore.delete(LAYVO_SESSION_COOKIE);

  if (tokenSessao) {
    await chamarLayvoApi("/v1/auth/sair", {
      method: "POST",
      body: JSON.stringify({ tokenSessao }),
    }).catch(() => null);
  }

  return new NextResponse(null, { status: 204 });
}
