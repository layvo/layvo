import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Layvo Gestão",
  description: "Vendas, estoque, clientes e financeiro em um só aplicativo para pequenos negócios.",
};

export default function LayvoGestao() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero product-hero">
          <div className="orb orb-one" /><div className="orb orb-two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><i /> Layvo Gestão</span>
              <h1>Seu negócio no controle. <span>Onde você estiver.</span></h1>
              <p>Vendas, estoque, clientes e financeiro organizados em um só aplicativo. Feito para quem quer crescer sem complicação.</p>
              <div className="hero-actions"><a className="button primary" href="#recursos">Conheça os recursos <b>→</b></a><a className="button ghost" href="mailto:contato@layvo.com.br">Fale com a gente</a></div>
              <div className="trust-row"><span>✓ Dados no seu aparelho</span><span>✓ Backup criptografado</span><span>✓ Feito no Brasil</span></div>
            </div>
            <div className="hero-visual" aria-label="Aplicativo Layvo Gestão">
              <div className="glow" />
              <div className="phone">
                <div className="phone-top"><span>9:41</span><i /></div>
                <div className="app-head"><Image src="/layvo-icon.png" width={42} height={42} alt="" /><div><small>Boa tarde,</small><strong>Meu Negócio</strong></div></div>
                <div className="balance"><small>Vendas este mês</small><strong>R$ 18.420,00</strong><em>↗ 12,4%</em></div>
                <div className="mini-grid"><div><i className="blue">▥</i><small>Vendas</small><b>127</b></div><div><i className="purple">◫</i><small>Produtos</small><b>342</b></div></div>
                <div className="chart-card"><span>Desempenho</span><div className="bars">{[42,58,47,74,68,91,80].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div></div>
              </div>
              <div className="float-card card-sale"><i>✓</i><span><small>Venda concluída</small><b>R$ 284,90</b></span></div>
              <div className="float-card card-stock"><i>▤</i><span><small>Estoque organizado</small><b>342 produtos</b></span></div>
            </div>
          </div>
        </section>
        <section className="section" id="recursos"><div className="container">
          <div className="section-heading"><span className="eyebrow"><i /> Tudo que importa</span><h2>Menos planilhas. <span>Mais clareza.</span></h2><p>As ferramentas essenciais para cuidar do seu negócio, reunidas em uma experiência simples e direta.</p></div>
          <div className="features">{[
            ["↗","Vendas descomplicadas","Registre vendas rapidamente e acompanhe o movimento do seu negócio."],
            ["▦","Estoque sob controle","Saiba o que entra, o que sai e receba clareza sobre seus produtos."],
            ["◎","Clientes por perto","Organize seus clientes, histórico de compras e crediário em um só lugar."],
            ["◒","Financeiro organizado","Acompanhe caixa, contas a pagar e a receber sem se perder."],
            ["▥","Relatórios que ajudam","Transforme seus números em decisões melhores para o dia a dia."],
            ["◇","Backup seguro","Proteja seus dados com backups criptografados sob o seu controle."],
          ].map(([icon,title,text])=><article className="feature-card" key={title}><i>{icon}</i><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div></section>
      </main>
      <SiteFooter />
    </>
  );
}
