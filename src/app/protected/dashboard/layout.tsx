"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { UsersIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const sidebar = document.getElementById("default-sidebar");
      if (sidebar && !sidebar.contains(target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const navigate = useCallback((url: string) => {
    const prefixURl = "protected/dashboard";
    router.push(`/${prefixURl}/${url}`);
  }, []);

  const menuItens = [
    {
      label: "Usuários",
      icon: UsersIcon,
      url: "users",
    },
    {
      label: "Acampamentos",
      icon: UsersIcon,
      url: "camps",
    },
  ];

  const currentPath = useMemo(() => {
    return pathname.split("/").pop();
  }, [pathname]);

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity ${
          isSidebarOpen ? "" : "hidden"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <button
        onClick={() => setIsSidebarOpen(true)}
        aria-controls="default-sidebar"
        type="button"
        className="fixed top-16 left-0 inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="w-6 h-6" />
      </button>
      <aside
        id="default-sidebar"
        className={`fixed top-${
          isSidebarOpen ? "0" : "16"
        } left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "" : "-translate-x-full sm:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {menuItens.map((item, index) => (
              <li
                onClick={() => navigate(item.url)}
                key={index}
                className={`${
                  currentPath === item.url
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white group">
                  <item.icon className="w-6 h-6" />
                  <span className="ms-3">{item.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div>{children}</div>
    </>
  );
}
