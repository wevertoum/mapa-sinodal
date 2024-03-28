"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { UsersIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

import HorizontalMenu from "@/components/HorizontalMenu";
import { Button } from "@/components/ui/button";

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
      label: "Usuários",
      icon: UsersIcon,
      url: "users",
    },
    {
      label: "Acampamentos",
      icon: UsersIcon,
      url: "camps",
    },
  ] as Models.MenuItens[];

  const currentPath = useMemo(() => {
    return pathname.split("/").pop();
  }, [pathname]);

  return (
    <div className="p-4 h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Bem vindo ao painel de controle</p>
        </div>
        <Button
          onClick={() => logOut()}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Sair
        </Button>
      </div>

      <hr className="my-4 border-gray-300" />
      <HorizontalMenu
        menuItens={menuItens}
        onNavigate={navigate}
        currentPath={currentPath}
      />
      {children}
    </div>
  );
}
