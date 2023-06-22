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
export type ClientAppItemProps<T> = T & {
  itemType: string;
  id: string;
  pk: { timestamp: number; itemType: string };
  orderIdx: number;
};
const useClientAppItems = <T,>({
  itemType,
  subType,
}: {
  itemType: string;
  subType?: string;
}) => {
  const [items, setItems] = useState<ClientAppItemProps<T>[]>([]);
  // const [lastEvalKey, setLastEvalKey] = useState<undefined | null | string>(
  //   null
  // );
  const auth = useAuthProvider();
  const { status, result, callFunction, setStatus } = useLoadingState<
    ClientAppItemData<ClientAppItemProps<T>>,
    FetchClientItemsProps
  >({
    asyncFunc: fetchClientAppItems,
  });
  //fetch items on mount
  useEffect(() => {
    callFunction({ itemType, subType });
  }, [callFunction, itemType]);
  //update items on result
  useEffect(() => {
    if (!result) return;
    const resultItems = result.result.Items as ClientAppItemProps<T>[];
    //const lastEvalKey = result.result.LastEvaluatedKey;
    unstable_batchedUpdates(() => {
      setItems((state) => {
        if (!state) return resultItems;
        const newArr = [...state, ...resultItems];
        return removeDuplicates(newArr);
      });
      // if (lastEvalKey) setLastEvalKey(JSON.stringify(lastEvalKey));
      // else setLastEvalKey(undefined);
    });
  }, [result]);
  const updateItems = async (newItems: ClientAppItemProps<T>[]) => {
    setStatus("loading");
    const { addedItems, removedItems, updatedItems } = await compareHistory(
      items,
      newItems
    );
    const credentials = await auth?.refreshAccessToken();
    if (!credentials) return setStatus("success");
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
      unstable_batchedUpdates(() => {
        setItems(newItems);
        setStatus("success");
      });
      return result;
    } catch (err) {
      setStatus("error");
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
