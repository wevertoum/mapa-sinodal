"use client";
import DrawCanvas from "@/components/DrawCanvas";
import React from "react";

const DrawPage: React.FC = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <DrawCanvas width={700} height={500} />
    </div>
  );
};

export default DrawPage;
