import useDebouncedEvent from "@/hooks/useDebouncedEvent";
import React, { useState } from "react";

interface Props {}

interface MockItem {
  width: number;
  color: string;
  id: number;
}

const DebounceLab: React.FC<Props> = () => {
  const { isChanging, handleEvent } = useDebouncedEvent<MockItem>(
    (typedValue) => {
      console.log("Array send in the last 1000 milliseconds:", typedValue);
    },
    1000
  );

  return (
    <div className="flex flex-col gap-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() =>
          handleEvent({ width: 10, color: "red", id: Math.random() * 1000 })
        }
      >
        send mock item
      </button>
      <small className="text-white">
        {isChanging ? "sending..." : "not sending!"}
      </small>
    </div>
  );
};

export default DebounceLab;
