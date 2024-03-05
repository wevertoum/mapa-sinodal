"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { UsersIcon } from "@heroicons/react/24/outline";

import React from "react";

interface AdminDashboardPageProps {
  params: {};
}

export default function AdminDashboardPage({
  params,
}: AdminDashboardPageProps) {
  const { userData } = useAuthContext();

  return (
    <>
      bem vindo ao painel {userData?.email}
      <br />
      seu token: {userData?.token}
    </>
  );
}
