"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [saindo, setSaindo] = useState(false);

  async function sair() {
    setSaindo(true);
    await fetch("/api/auth/sair", { method: "POST" }).catch(() => null);
    router.replace("/entrar");
    router.refresh();
  }

  return (
    <button className="button ghost" type="button" onClick={sair} disabled={saindo}>
      {saindo ? "Saindo..." : "Sair da conta"}
    </button>
  );
}
