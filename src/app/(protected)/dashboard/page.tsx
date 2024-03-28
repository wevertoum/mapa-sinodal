"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import React from "react";

interface AdminDashboardPageProps {
  params: {};
}

export default function AdminDashboardPage({
  params,
}: AdminDashboardPageProps) {
  const { userData } = useAuthContext();

  return (
    <div className="flex items-center justify-center">
      <div className="text-center mt-48">
        <Image
          src="/success.svg"
          alt="Success"
          width={300}
          height={300}
          className="h-24 w-auto mx-auto mb-4"
        />  
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bem-vindo ao painel
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          E-mail: {userData?.email}
        </p>
      </div>
    </div>
  );
}
