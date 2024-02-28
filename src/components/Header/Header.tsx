"use client";
import React from "react";
import LogoSinodal from "@/icons/LogoSinodal";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {  Bars3Icon } from "@heroicons/react/24/outline";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { useTheme } from "next-themes";

interface Props {}
const Header: React.FC<Props> = () => {
  const { theme } = useTheme();
  const menuItens = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Acampamentos",
      url: "/campings",
    },
    {
      title: "Contato",
      url: "/contact",
    },
  ];

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-white dark:bg-dark-custom p-4 fixed top-0 w-full">
      <div className="flex justify-between">
        <div className="flex items-center">
          <LogoSinodal size={30} theme={theme} />
        </div>
        <div className="flex items-center">
          {menuItens.map((item, index) => (
            <a
              onClick={() => router.push(item.url)}
              key={index}
              className={`text-stone-800 dark:text-white mx-6 font-bold cursor-pointer pb-1 ${
                pathname === item.url ? "active" : "border-bottom-animation"
              } ${theme}`}
            >
              {item.title}
            </a>
          ))}
          <div
            className="
            h-6 w-[1px]
            bg-stone-500
            dark:text-slate-600
            mr-4
            "
          ></div>
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
};

export default Header;
