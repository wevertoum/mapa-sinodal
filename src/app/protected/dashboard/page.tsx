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
  const { token } = useAuthContext();

  return (
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui asda dsa sda sda dsas dasd asd asd asd asd asd asd asd asd asd asda sdasd asd asd asd asd
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui
    </>
  );
}
