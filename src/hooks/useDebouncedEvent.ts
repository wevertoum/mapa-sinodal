import { useState, useEffect, useCallback } from "react";

const useDebouncedEvent = <T>(
  callback: (values: T[]) => void,
  delay: number = 500
) => {
  const [state, setState] = useState<{ isChanging: boolean; lastValues: T[] }>({
    isChanging: false,
    lastValues: [],
  });

  const handleTypingTimeout = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isChanging: false,
    }));
    callback(state.lastValues);
    setState((prevState) => ({
      ...prevState,
      lastValues: [],
    }));
  }, [state.lastValues, callback]);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout | undefined;

    if (state.isChanging) {
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(handleTypingTimeout, delay);
    }

    return () => {
      clearTimeout(typingTimeout);
    };
  }, [state.isChanging, delay, handleTypingTimeout]);

  const handleEvent = useCallback((value: T) => {
    setState((prevState) => ({
      ...prevState,
      isChanging: true,
      lastValues: [...prevState.lastValues, value],
    }));
  }, []);

  return { isChanging: state.isChanging, handleEvent };
};

export default useDebouncedEvent;
