"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center space-y-10 mt-28">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="max-w-3xl text-center font-bold text-gray-900 dark:text-white text-5xl leading-tight">
          bem vindo ao portal sinodal
        </h1>
      </div>
      <Button
        onClick={() => router.push("/signin")}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Login
      </Button>
    </div>
  );
}
