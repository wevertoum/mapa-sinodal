"use client";
import { useCallback } from "react";
import { UsersIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

import HorizontalMenu from "@/components/HorizontalMenu";
import { Button } from "@/components/ui/button";
import ToggleTheme from "@/components/ToggleTheme";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { logOut } = useAuthContext();

  const navigate = useCallback((url: string) => {
    const prefixURl = "dashboard";
    router.push(`/${prefixURl}/${url}`);
  }, []);

  const menuItens = [
    {
      label: "Acampamentos",
      icon: UsersIcon,
      url: "camps",
    },
    {
      label: "Cadastrar administrador",
      icon: UsersIcon,
      url: "users",
    },
  ] as Models.MenuItens[];

  return (
    <div className="p-4 min-h-screen dark:bg-slate-800">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-400 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-500">Bem vindo ao painel de controle</p>
        </div>
        <div className="flex items-center space-x-4">
          <ToggleTheme />
          <Button
            onClick={() => logOut()}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Sair
          </Button>
        </div>
      </div>
      <Separator className="my-4 bg-slate-500" />
      <HorizontalMenu menuItens={menuItens} onNavigate={navigate} />
      {children}
    </div>
  );
}
