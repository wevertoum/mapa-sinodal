"use client";
import DebounceInput from "@/components/DebounceInput";
import DrawCanvas from "@/components/DrawCanvas";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";

const DrawPage: React.FC = () => {
  const [drawedLines, setDrawedLines] = useState<Models.DrawedLine[]>([]);
  const [preferences, setPreferences] = useState({
    color: "#000000",
    width: 5,
  });

  const onChange = useCallback((newLine: Models.DrawedLine) => {
    setDrawedLines((prevLines) => [...prevLines, newLine]);
  }, []);

  const debounceToChangePreferences = debounce(
    (newPreferences: typeof preferences) => {
      setPreferences(newPreferences);
    },
    500
  );

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
      <DebounceInput />
      <div className="w-full h-full flex justify-center items-center gap-4">
        <div>
          <small className="text-white text-left">Drawing</small>
          <br />
          <DrawCanvas
            width={400}
            height={400}
            onChange={onChange}
            preferences={preferences}
          />
        </div>
        <div>
          <small className="text-white text-left">Rendering</small>
          <br />
          {drawedLines && (
            <DrawCanvas
              disabled
              width={400}
              height={400}
              drawedLines={drawedLines}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 mb-32">
        <div>
          <small className="text-white text-left">Color</small>
          <br />
          <input
            type="color"
            onChange={(e) =>
              debounceToChangePreferences({
                ...preferences,
                color: e.target.value,
              })
            }
          />
        </div>
        <div>
          <small className="text-white text-left">Width</small>
          <br />
          <input
            type="range"
            min="1"
            max="10"
            onChange={(e) =>
              debounceToChangePreferences({
                ...preferences,
                width: +e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DrawPage;
