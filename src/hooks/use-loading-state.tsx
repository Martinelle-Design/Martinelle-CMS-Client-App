import { useCallback, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
const useLoadingState = ({
  asyncFunc,
}: {
  asyncFunc: (e?: any) => Promise<any>;
}) => {
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "success"
  );
  const [result, setResult] = useState<any>();
  const callbackFunction: <T>(e?: T) => Promise<void> = async (e) => {
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
