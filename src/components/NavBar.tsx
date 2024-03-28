"use client";
import React, { useState } from "react";
import LogoSinodal from "@/icons/LogoSinodal";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ToggleTheme from "./ToggleTheme";
import { useTheme } from "next-themes";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface Props {}

const NavBar: React.FC<Props> = () => {
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
    {
      title: "Login",
      url: "/signin",
    },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 fixed top-0 w-full">
      <div className="flex justify-between">
        <div className="flex items-center">
          <LogoSinodal size={30} theme={theme} />
        </div>
        <div className="flex items-center">
          <div className="hidden md:flex items-center">
            {menuItens.map((item, index) => (
              <a
                onClick={() => {
                  router.push(item.url);
                }}
                key={index}
                className={`text-stone-800 dark:text-white mx-6 font-bold cursor-pointer pb-1 ${
                  pathname === item.url ? "active" : "border-bottom-animation"
                } ${theme}`}
              >
                {item.title}
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <Bars3Icon
              className="h-6 w-6 text-gray-700 dark:text-white cursor-pointer mr-4"
              onClick={toggleMenu}
            />
          </div>

          {isMenuOpen && (
            <div className="md:hidden absolute top-16 right-4 bg-white dark:bg-slate-800 p-4 shadow-lg rounded-lg">
              {menuItens.map((item, index) => (
                <a
                  onClick={() => {
                    router.push(item.url);
                    setIsMenuOpen(false);
                  }}
                  key={index}
                  className={`block text-stone-800 dark:text-white font-bold mb-4 cursor-pointer pb-1 ${
                    pathname === item.url ? "active" : ""
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </div>
          )}
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

export default NavBar;
