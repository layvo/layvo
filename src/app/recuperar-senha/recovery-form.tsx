"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export function RecoveryForm() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function recuperar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      const resposta = await fetch("/api/auth/recuperar-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const dados = await resposta.json().catch(() => null);
      if (!resposta.ok) {
        throw new Error(dados?.erro?.mensagem || "Não foi possível enviar.");
      }
      setEnviado(true);
    } catch (falha) {
      setErro(falha instanceof Error ? falha.message : "Não foi possível enviar.");
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="auth-success" role="status">
        <strong>Confira seu e-mail</strong>
        <p>Se este e-mail estiver cadastrado, você receberá as instruções para criar uma nova senha.</p>
        <Link className="button ghost" href="/entrar">Voltar para entrar</Link>
      </div>
    );
  }

  return (
    <form className="auth-form" onSubmit={recuperar}>
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
      {erro ? <p className="auth-message error" role="alert">{erro}</p> : null}
      <button className="button primary auth-submit" disabled={enviando}>
        {enviando ? "Enviando..." : "Enviar instruções"}
      </button>
      <Link className="auth-back" href="/entrar">Voltar para entrar</Link>
    </form>
  );
}
