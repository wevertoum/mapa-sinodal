import { useState, useEffect } from "react";

const useDebouncedEvent = <T>(
  callback: (values: T[]) => void,
  delay: number = 500
) => {
  const [isChanging, setIsChanging] = useState(false);
  const [lastValue, setLastValue] = useState<T[]>([]);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout | undefined;

    const handleTypingTimeout = () => {
      setIsChanging(false);
      callback(lastValue);
      setLastValue([]);
    };

    if (isChanging) {
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(handleTypingTimeout, delay);
    }

    return () => {
      clearTimeout(typingTimeout);
    };
  }, [lastValue, isChanging, delay, callback]);

  const handleEvent = (e: T) => {
    setLastValue((prevValue) => [...prevValue, e]);

    if (!isChanging) {
      setIsChanging(true);
    }
  };

  return { isChanging, handleEvent };
};

export default useDebouncedEvent;
