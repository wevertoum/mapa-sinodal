"use client";
import React from "react";
import LogoSinodal from "@/icons/LogoSinodal";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

interface Props {}
const Header: React.FC<Props> = () => {
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
    <div className="bg-dark-custom  p-4 fixed top-0 w-full">
      <div className="flex justify-between">
        <div className="flex items-center">
          <LogoSinodal size={30} />
        </div>
        <div className="flex items-center">
          {menuItens.map((item, index) => (
            <a
              onClick={() => router.push(item.url)}
              key={index}
              className={`text-white mx-6 font-bold cursor-pointer pb-1 ${
                pathname === item.url ? "active" : "border-bottom-animation"
              }`}
            >
              {item.title}
            </a>
          ))}
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
};

export default Header;
