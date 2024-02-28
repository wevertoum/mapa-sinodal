"use client";
import React, { useState } from "react";
import Sun from "@/icons/Sun";
import Moon from "@/icons/Moon";

interface Props {}
const ToggleTheme: React.FC<Props> = () => {
  const [theme, setTheme] = useState("light");

  return (
    <div
      className="h-6 w-6 cursor-pointer"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </div>
  );
};

export default ToggleTheme;
