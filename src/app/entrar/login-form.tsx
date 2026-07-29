"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function entrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      const resposta = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      const dados = await resposta.json().catch(() => null);
      if (!resposta.ok) {
        throw new Error(dados?.erro?.mensagem || "Não foi possível entrar.");
      }

      const retorno = searchParams.get("retorno");
      router.replace(
        retorno?.startsWith("/") && !retorno.startsWith("//")
          ? retorno
          : "/conta",
      );
      router.refresh();
    } catch (falha) {
      setErro(falha instanceof Error ? falha.message : "Não foi possível entrar.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={entrar}>
      <label>
        E-mail
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="voce@email.com"
          autoComplete="email"
          required
        />
      </label>
      <label>
        Senha
        <input
          type="password"
          name="senha"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          placeholder="Sua senha"
          autoComplete="current-password"
          minLength={8}
          required
        />
      </label>
      <div className="auth-form-meta">
        <Link href="/recuperar-senha">Esqueci minha senha</Link>
      </div>
      {erro ? <p className="auth-message error" role="alert">{erro}</p> : null}
      <button className="button primary auth-submit" disabled={enviando}>
        {enviando ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
