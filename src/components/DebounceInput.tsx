import React, { useState, useEffect } from "react";

interface Props {}
const DebounceInput: React.FC<Props> = () => {
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastValue, setLastValue] = useState("");

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout | undefined;

    const handleTypingTimeout = () => {
      setIsTyping(false);
      console.log("Last value:", lastValue);
      setLastValue("");
      setValue("");
    };

    if (isTyping) {
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(handleTypingTimeout, 500);
    }

    return () => {
      clearTimeout(typingTimeout);
    };
  }, [lastValue, isTyping]);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typedValue = e.target.value;
    setValue(typedValue);
    setLastValue(typedValue);

    if (!isTyping) {
      setIsTyping(true);
    }
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
