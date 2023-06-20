import { useCallback, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
const useLoadingState = <T, K>({
  asyncFunc,
}: {
  asyncFunc: (e?: K) => Promise<T | null>;
}) => {
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "success"
  );
  const [result, setResult] = useState<T | null>(null);
  const callbackFunction: (e?: K) => Promise<void> = async (e) => {
    setStatus("loading");
    try {
      const result = await asyncFunc(e);
      unstable_batchedUpdates(() => {
        setResult(result);
        setStatus("success");
      });
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };
  const callFunction = useCallback(callbackFunction, [asyncFunc]);
  return { status, result, callFunction };
};
export default useLoadingState;
