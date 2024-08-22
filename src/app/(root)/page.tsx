"use client";
import DisplayContent from "@/components/DisplayContent";
import { defaultTextColor } from "@/utils/constants";

export default function Home() {
  return (
    <DisplayContent>
      <div className="flex flex-col items-center justify-center space-y-10 mt-28">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="max-w-3xl text-center font-bold text-gray-900 dark:text-white text-5xl leading-tight">
            Portal sinodal
          </h1>
          <p className={`max-w-lg text-center ${defaultTextColor}`}>
            Em breve, novidades!
          </p>
        </div>
      </div>
    </DisplayContent>
  );
}
