import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { RecoveryForm } from "./recovery-form";

export const metadata: Metadata = {
  title: "Recuperar senha",
  description: "Recupere o acesso à sua conta Layvo.",
};

export default function RecuperarSenhaPage() {
  return (
    <>
      <SiteHeader />
      <main className="auth-main">
        <div className="auth-orb auth-orb-one" />
        <div className="auth-orb auth-orb-two" />
        <section className="auth-card">
          <span className="eyebrow"><i /> Conta Layvo</span>
          <h1>Recuperar senha</h1>
          <p>Informe o e-mail usado na sua conta Layvo e enviaremos as instruções.</p>
          <RecoveryForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
