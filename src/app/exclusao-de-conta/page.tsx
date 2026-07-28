import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Exclusão de conta",
  description: "Exclua sua conta e os dados associados ao Layvo Gestão.",
};

const sections = [
  {
    title: "Exclusão diretamente no aplicativo",
    paragraphs: [
      "No Layvo Gestão, abra o menu da conta, entre em Conta > Excluir conta, informe sua senha e confirme a exclusão. Esse caminho exclui a conta online e limpa os dados locais do aplicativo naquele aparelho.",
      "Antes de confirmar, exporte o que deseja conservar. A exclusão é definitiva e não pode ser desfeita.",
    ],
  },
  {
    title: "Solicitação sem acesso ao aplicativo",
    paragraphs: [
      "Se você não consegue entrar no aplicativo, envie uma mensagem a partir do e-mail cadastrado para contato@layvo.com.br, com o assunto “Exclusão de conta Layvo Gestão”. Informe o nome da empresa vinculada para facilitar a identificação.",
      "Confirmaremos o recebimento e poderemos solicitar uma verificação de identidade para proteger a conta contra pedidos indevidos. Procuramos responder solicitações verificadas em até 15 dias.",
    ],
  },
  {
    title: "O que será excluído",
    paragraphs: [
      "Excluiremos os dados da conta, vínculos exclusivos com empresas, registros de dispositivos, aceites e feedbacks associados. Se uma empresa possuir outros membros ativos, poderá ser necessário transferir sua propriedade antes da exclusão.",
      "Informações poderão ser conservadas de forma limitada quando isso for exigido por lei ou necessário para prevenir fraude e resguardar direitos. Nesses casos, permanecerão apenas pelo período necessário para essa finalidade.",
    ],
  },
  {
    title: "Dados locais quando o pedido é feito por e-mail",
    paragraphs: [
      "O pedido por e-mail exclui os dados mantidos nos sistemas da Layvo, mas não consegue apagar remotamente o banco de dados que permanece no aparelho. Para removê-lo, limpe os dados do aplicativo ou desinstale o Layvo Gestão.",
      "A exclusão feita diretamente dentro do aplicativo já executa essa limpeza local naquele aparelho.",
    ],
  },
  {
    title: "Backups e serviços externos",
    paragraphs: [
      "Arquivos de backup, comprovantes e relatórios enviados para Google Drive, mensageiros ou outros destinos permanecem sob seu controle. Exclua esses arquivos diretamente nos serviços onde foram salvos.",
      "A Layvo não recebe a senha dos backups criptografados e não consegue acessar ou apagar arquivos mantidos em serviços externos.",
    ],
  },
];

export default function Page() {
  return (
    <LegalPage
      title="Exclusão de conta"
      intro="Exclua sua conta Layvo Gestão pelo aplicativo ou solicite a exclusão mesmo sem acesso a ele."
      sections={sections}
    />
  );
}
