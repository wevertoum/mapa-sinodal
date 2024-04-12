import React, { useState, useEffect } from "react";

interface Props {}
const DebounceInput: React.FC<Props> = () => {
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastValue, setLastValue] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      timeoutId = setTimeout(() => {
        console.log("Last value:", lastValue);
        setLastValue("");
        setIsTyping(false);
        setValue("");
      }, 2000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [lastValue, isTyping]);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsTyping(true);
    setLastValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <input type="text" onChange={handleChanges} value={value} />
      <small className="text-white">
        {isTyping ? "Typing..." : "Not typing"}
      </small>
    </div>
  );
};

export default DebounceInput;
