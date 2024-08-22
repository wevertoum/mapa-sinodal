import { defaultTextColor } from "@/utils/constants";
import React, { useState } from "react";

interface SampleJsonProps {
  onChange: (value: string) => void;
}

const SampleJson = ({ onChange }: SampleJsonProps) => {
  return (
    <div className="flex">
      <div className="w-1/2 p-4 bg-gray-100 dark:bg-gray-800">
        <pre className={`text-sm ${defaultTextColor}`}>
          {JSON.stringify(
            [
              {
                capacity: 8,
                gender: "M",
                name: "Quarto 1",
              },
              {
                capacity: 10,
                gender: "F",
                name: "Quarto 2",
              },
            ],
            null,
            2
          )}
        </pre>
      </div>
      <div className="w-1/2 p-4">
        <textarea
          className="w-full h-full border p-2"
          onChange={(e) => onChange(e.target.value)}
          placeholder="Cole seu JSON aqui"
        />
      </div>
    </div>
  );
};

export default SampleJson;
