import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="company-hero">
          <div className="company-grid" aria-hidden="true" />
          <div className="company-glow glow-left" />
          <div className="company-glow glow-right" />
          <div className="container company-hero-inner">
            <div className="company-copy">
              <span className="eyebrow"><i /> Tecnologia que movimenta negócios</span>
              <h1>Transformamos desafios em <span>soluções digitais.</span></h1>
              <p>A Layvo cria softwares inteligentes, produtos digitais e soluções sob medida para tornar empresas mais simples, eficientes e preparadas para crescer.</p>
              <div className="hero-actions">
                <a className="button primary" href="#solucoes">Conheça nossas soluções <b>→</b></a>
                <a className="button ghost" href="mailto:contato@layvo.com.br?subject=Quero falar sobre um projeto">Fale sobre seu projeto</a>
              </div>
            </div>
            <div className="company-mark" aria-hidden="true">
              <div className="mark-ring ring-one" />
              <div className="mark-ring ring-two" />
              <div className="mark-core"><Image src="/layvo-symbol.png" width={250} height={250} alt="" priority /></div>
              <span className="tech-pill pill-one">Produtos digitais</span>
              <span className="tech-pill pill-two">Sistemas inteligentes</span>
              <span className="tech-pill pill-three">Soluções sob medida</span>
            </div>
          </div>
        </section>

        <section className="company-strip">
          <div className="container strip-items">
            <span>Estratégia</span><i />
            <span>Design</span><i />
            <span>Tecnologia</span><i />
            <span>Evolução</span>
          </div>
        </section>

        <section className="section company-solutions" id="solucoes">
          <div className="container">
            <div className="section-heading company-heading">
              <span className="eyebrow"><i /> O que fazemos</span>
              <h2>Tecnologia com propósito, <span>do conceito à escala.</span></h2>
              <p>Unimos visão de negócio, experiência e engenharia para criar soluções que resolvem problemas reais.</p>
            </div>
            <div className="service-grid">
              {[
                ["01","Produtos digitais","Criamos aplicativos e plataformas próprias, pensados para simplificar operações e gerar valor todos os dias."],
                ["02","Software sob medida","Desenvolvemos sistemas alinhados aos processos, objetivos e ritmo de crescimento de cada negócio."],
                ["03","Automação e integração","Conectamos ferramentas e automatizamos tarefas para reduzir trabalho manual e aumentar a eficiência."],
              ].map(([number,title,text]) => (
                <article className="service-card" key={number}>
                  <span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><i>↗</i>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="product-showcase" id="produtos">
          <div className="container product-showcase-grid">
            <div className="product-art">
              <div className="product-aura" />
              <Image src="/layvo-icon.png" width={280} height={280} alt="Ícone do Layvo Gestão" />
              <span className="product-tag tag-top">Vendas + Estoque</span>
              <span className="product-tag tag-bottom">Financeiro + Clientes</span>
            </div>
            <div className="product-copy">
              <span className="eyebrow light-dark"><i /> Nosso primeiro produto</span>
              <h2>Layvo Gestão</h2>
              <h3>Seu negócio no controle. Onde você estiver.</h3>
              <p>Uma solução simples e completa para pequenos negócios organizarem vendas, estoque, clientes e financeiro em um só lugar.</p>
              <ul><li>Gestão simples e intuitiva</li><li>Dados sob o controle do usuário</li><li>Feito para a realidade brasileira</li></ul>
              <Link className="button primary" href="/produtos/layvo-gestao">Conheça o Layvo Gestão <b>→</b></Link>
            </div>
          </div>
        </section>

        <section className="values-section">
          <div className="container values-grid">
            <div><span className="eyebrow"><i /> Como pensamos</span><h2>Software bom é aquele que melhora o dia a dia.</h2></div>
            <div className="values-list">
              <article><b>01</b><span><strong>Simples por natureza</strong><small>Complexidade fica nos bastidores. Para o usuário, tudo precisa ser claro.</small></span></article>
              <article><b>02</b><span><strong>Construído para durar</strong><small>Tecnologia responsável, segura e preparada para evoluir junto com o negócio.</small></span></article>
              <article><b>03</b><span><strong>Próximo de verdade</strong><small>Escutamos, entendemos e criamos soluções conectadas com necessidades reais.</small></span></article>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta-card">
            <div><span className="eyebrow light"><i /> Vamos construir juntos</span><h2>Tem uma ideia ou desafio que a tecnologia pode resolver?</h2><p>Conte para a Layvo. A próxima grande solução pode começar com uma conversa.</p></div>
            <a className="button white" href="mailto:contato@layvo.com.br?subject=Quero conversar sobre uma solução">Vamos conversar <b>→</b></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
