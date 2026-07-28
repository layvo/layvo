import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { terms } from "@/data/legal";
export const metadata: Metadata = { title: "Termos de Uso", description: "Termos que regulam o uso do aplicativo Layvo Gestão." };
export default function Page(){return <LegalPage title="Termos de Uso" intro="Estas condições ajudam a manter uma relação transparente e segura entre você e a Layvo." sections={terms}/>;}
