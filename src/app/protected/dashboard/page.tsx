"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import React from "react";

interface AdminDashboardPageProps {
  params: {};
}

export default function AdminDashboardPage({
  params,
}: AdminDashboardPageProps) {
  const { token } = useAuthContext();

  return (
    <>
      <h1>protected area dashboard: {token}</h1>
    </>
  );
}
