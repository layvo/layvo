import { SiteFooter, SiteHeader } from "./site-shell";

export type LegalSection = { title: string; paragraphs: string[] };

export function LegalPage({ title, intro, sections, updated = "28 de julho de 2026" }: { title: string; intro: string; sections: LegalSection[]; updated?: string }) {
  return <>
    <SiteHeader />
    <main className="legal-main">
      <div className="container legal-wrap">
        <aside><span>Documentos legais</span><a href="/politica-de-privacidade">Política de Privacidade</a><a href="/termos-de-uso">Termos de Uso</a><a href="/exclusao-de-conta">Exclusão de conta</a></aside>
        <article className="legal-document">
          <div className="legal-head"><span className="eyebrow"><i /> Transparência Layvo</span><h1>{title}</h1><p>{intro}</p><small>Versão 1.0 · Última atualização: {updated}</small></div>
          {sections.map(section => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(p => <p key={p}>{p}</p>)}</section>)}
          <div className="contact-box"><strong>Ficou com alguma dúvida?</strong><p>Entre em contato pelo e-mail <a href="mailto:contato@layvo.com.br">contato@layvo.com.br</a>.</p></div>
        </article>
      </div>
    </main>
    <SiteFooter />
  </>;
}
