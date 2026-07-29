import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return <header className="site-header"><div className="container nav">
    <Link className="brand" href="/"><Image src="/layvo-symbol.png" width={36} height={36} alt="" /><span>layvo</span></Link>
    <nav aria-label="Navegação principal"><Link href="/#solucoes">Soluções</Link><Link href="/#produtos">Produtos</Link><Link href="/produtos/layvo-gestao">Layvo Gestão</Link><a href="mailto:contato@layvo.com.br">Contato</a><Link className="nav-cta" href="/conta">Entrar</Link></nav>
  </div></header>;
}

export function SiteFooter() {
  return <footer className="footer"><div className="container footer-grid">
    <div><Link className="brand" href="/"><Image src="/layvo-symbol.png" width={34} height={34} alt="" /><span>layvo</span></Link><p>Gestão simples para negócios que querem ir mais longe.</p></div>
    <div><strong>Produto</strong><Link href="/produtos/layvo-gestao">Layvo Gestão</Link><Link href="/politica-de-privacidade">Política de Privacidade</Link><Link href="/termos-de-uso">Termos de Uso</Link><Link href="/exclusao-de-conta">Exclusão de conta</Link></div>
    <div><strong>Contato</strong><a href="mailto:contato@layvo.com.br">contato@layvo.com.br</a><span>Brasil</span></div>
  </div><div className="container copyright">© {new Date().getFullYear()} Layvo. Todos os direitos reservados.</div></footer>;
}
