import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import React from "react";

interface Props {}

interface MockItem {
  foo: string;
  bar: string;
  id: number;
}

const DebounceLab: React.FC<Props> = () => {
  const { isChanging, handleEvent } = useDebouncedCallback<MockItem>(
    (typedValue) => {
      console.log(
        "Array of type T stored during the last interval of interactions:",
        typedValue
      );
    },
    200
  );

  return (
    <div className="flex flex-col gap-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() =>
          handleEvent({
            foo: "foo",
            bar: "bar",
            id: Math.random() * 1000,
          })
        }
      >
        Click quickly and then stop to see the magic!
      </button>
      <small className="text-white">
        {isChanging ? "Sending events..." : "Not sending!"}
      </small>
    </div>
  );
};

export default DebounceLab;
