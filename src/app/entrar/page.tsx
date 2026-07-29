import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Entre na sua conta Layvo.",
};

export default function EntrarPage() {
  return (
    <>
      <SiteHeader />
      <main className="auth-main">
        <div className="auth-orb auth-orb-one" />
        <div className="auth-orb auth-orb-two" />
        <section className="auth-card">
          <span className="eyebrow"><i /> Conta Layvo</span>
          <h1>Boas-vindas de volta</h1>
          <p>Entre com a mesma conta usada no Layvo Gestão.</p>
          <Suspense fallback={<div className="auth-loading">Carregando...</div>}>
            <LoginForm />
          </Suspense>
          <small className="auth-security">Sua senha é enviada com conexão segura e não fica armazenada neste site.</small>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
