import { useEffect, useState } from "react";
import { useAuthProvider } from "../authentication/Authentication";
import removeDuplicates from "../utilities/helpers/removeDuplicates";
import useLoadingState from "./use-loading-state";
import { unstable_batchedUpdates } from "react-dom";
import fetchClientAppItems, {
  FetchClientItemsProps,
  ClientAppItemData,
} from "../asyncActions/fetchClientItems";
import compareHistory from "../asyncActions/compareHistory";
import addClientItems from "../asyncActions/addClientItems";
import deleteClientItems from "../asyncActions/deleteClientItems";
import updateClientItems from "../asyncActions/updateClientItems";
type ClientAppItemProps<T> = T & {
  itemType: string;
  id: string;
  pk: { timestamp: number; itemType: string };
};
const useClientAppItems = <T,>({ itemType }: { itemType: string }) => {
  const [items, setItems] = useState<ClientAppItemProps<T>[]>([]);
  const [lastEvalKey, setLastEvalKey] = useState<undefined | null | string>(
    null
  );
  const auth = useAuthProvider();
  const { status, result, callFunction } = useLoadingState<
    ClientAppItemData<ClientAppItemProps<T>>,
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
    const resultItems = result.result.Items as ClientAppItemProps<T>[];
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
  const updateItems = async (newItems: ClientAppItemProps<T>[]) => {
    const { addedItems, removedItems, updatedItems } = await compareHistory(
      items,
      newItems
    );
    const credentials = await auth?.refreshAccessToken();
    if (!credentials) return;
    const token = credentials.access_token;
    const addItemPromises = addedItems.map((item) => {
      return addClientItems({
        token,
        itemType,
        data: item,
      });
    });
    const removeItemPromises = removedItems.map((item) => {
      return deleteClientItems({
        token,
        itemType,
        data: item,
      });
    });
    const updateItemPromises = updatedItems.map((item) => {
      return updateClientItems({
        token,
        itemType,
        data: item,
      });
    });
    try {
      const result = await Promise.allSettled([
        ...addItemPromises,
        ...removeItemPromises,
        ...updateItemPromises,
      ]);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  return {
    status,
    items,
    setItems,
    updateItems,
  };
};
export default useClientAppItems;
