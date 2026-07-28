import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { privacy } from "@/data/legal";
export const metadata: Metadata = { title: "Política de Privacidade", description: "Saiba como o Layvo Gestão trata e protege seus dados." };
export default function Page(){return <LegalPage title="Política de Privacidade" intro="Entenda de forma clara como coletamos, utilizamos e protegemos os dados no Layvo Gestão." sections={privacy}/>;}
