import { debounce } from "lodash";
import { useState, useCallback } from "react";
const useDebouncedTextInput = ({
  time = 100,
  debouncedFunc,
}: {
  time?: number;
  debouncedFunc: (e: string) => void;
}) => {
  const [textValue, setTextValue] = useState("");
  const debounced = useCallback(
    (e: string) => debounce(debouncedFunc, time),
    [debouncedFunc, time]
  );
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const string = e.currentTarget.value;
    setTextValue(string);
    debounced(string);
  };
  return {
    textValue,
    onChange,
    setTextValue
  };
};
export default useDebouncedTextInput;
