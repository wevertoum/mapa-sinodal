"use client";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  menuItens: Models.MenuItens[];
  onNavigate: (url: string) => void;
}
const HorizontalMenu: React.FC<Props> = ({
  menuItens,

  onNavigate,
}) => {
  const path = usePathname();

  return (
    <div className="flex space-x-4">
      {menuItens.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer flex items-center px-3 py-1 rounded-lg ${
            path.includes(item.url)
              ? "bg-gray-400 dark:bg-gray-600"
              : "hover:bg-gray-400 dark:hover:bg-gray-600"
          }`}
          onClick={() => onNavigate(item.url)}
        >
          <item.icon className="w-6 h-6 " />
          <span className="ms-2">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default HorizontalMenu;
