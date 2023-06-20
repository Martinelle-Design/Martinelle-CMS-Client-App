import { useEffect, useState } from "react";
import { useAuthProvider } from "../authentication/Authentication";
import removeDuplicates from "../utilities/helpers/removeDuplicates";
import useLoadingState from "./use-loading-state";
import { unstable_batchedUpdates } from "react-dom";
import fetchClientAppItems, {
  FetchClientItemsProps,
  ClientAppItemData,
} from "../asyncActions/fetchClientItems";
const useClientAppItems = <T,>({ itemType }: { itemType: string }) => {
  const [items, setItems] = useState<(T & { itemType: string; id: string })[]>(
    []
  );
  const [lastEvalKey, setLastEvalKey] = useState<undefined | null | string>(
    null
  );
  const auth = useAuthProvider();
  const { status, result, callFunction } = useLoadingState<
    ClientAppItemData<T & { itemType: string }>,
    FetchClientItemsProps
  >({
    asyncFunc: fetchClientAppItems,
  });
  //fetch items on mount
  useEffect(() => {
    if (status === "loading") return;
    if (items && items.length > 0) return;
    if (lastEvalKey === undefined) return;
    if (!auth) return;
    if (!auth.credentials) return;
    if (!auth.credentials.access_token) return;
    callFunction({ token: auth.credentials.access_token, itemType });
  }, [auth, items, status, callFunction, lastEvalKey, itemType]);
  //update items on result
  useEffect(() => {
    if (!result) return;
    const resultItems = result.result.Items as (T & {
      id: string;
      itemType: string;
    })[];
    const lastEvalKey = result.result.LastEvaluatedKey;
    unstable_batchedUpdates(() => {
      setItems((state) => {
        if (!state) return resultItems;
        const newArr = [...state, ...resultItems];
        return removeDuplicates(newArr);
      });
      if (lastEvalKey) setLastEvalKey(JSON.stringify(lastEvalKey));
      else setLastEvalKey(undefined);
    });
  }, [result]);
  return {
    status,
    items,
    setItems,
  };
};
export default useClientAppItems;
