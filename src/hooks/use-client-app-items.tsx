import { useEffect, useState } from "react";
import { useAuthProvider } from "../authentication/Authentication";
import { QueryCommandOutput } from "@aws-sdk/client-dynamodb";
import removeDuplicates from "../utilities/helpers/removeDuplicates";
import useLoadingState from "./use-loading-state";
import axios from "axios";
import { unstable_batchedUpdates } from "react-dom";
type FetchClientItemsProps = {
  token: string;
  itemType: string;
};
type GeneralFetchData = {
  message: string;
  result: Omit<QueryCommandOutput, "$metadata" | "Items">;
};
type ClientAppItemData<T> = GeneralFetchData & {
  result: {
    Items: T[];
  };
};
const restApiUrl = `https://${process.env.REACT_APP_REST_API_URL}/manage-content/`;
const fetchClientAppItems = async <T extends { itemType: string }>(
  props?: FetchClientItemsProps
) => {
  if (!props) return null;
  const { itemType, token } = props;
  if (!token) return null;
  try {
    const { data } = await axios({
      method: "GET",
      url: `${restApiUrl}${itemType}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data as ClientAppItemData<T>;
  } catch (error) {
    console.log(error);
    return null;
  }
};
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
    if (items && items.length > 0) return;
    if (!auth) return;
    if (!auth.credentials) return;
    if (!auth.credentials.access_token) return;
    if (lastEvalKey === undefined) return;
    callFunction({ token: auth.credentials.access_token, itemType });
  }, [auth, items, callFunction]);
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
    });
  }, [result]);
  return {
    status,
    items,
    setItems,
  };
};
export default useClientAppItems;
