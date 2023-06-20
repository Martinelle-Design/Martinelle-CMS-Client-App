import { useEffect, useState } from "react";
import useLoadingState from "./use-loading-state";
import axios from "axios";
import { useAuthProvider } from "../authentication/Authentication";
import removeDuplicates from "../utilities/helpers/removeDuplicates";
type FetchClientItemsProps = {
  token: string;
  itemType: string;
};
const restApiUrl = `https://${process.env.REACT_APP_REST_API_URL}/manage-content/`;
const fetchClientAppItems = async <T extends { itemType: string }>(
  props?: FetchClientItemsProps
) => {
  if (!props) return [] as T[];
  const { itemType, token } = props;
  if (!token) return [] as T[];
  try {
    const { data } = await axios({
      method: "GET",
      url: `${restApiUrl}${itemType}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data as T[];
  } catch (error) {
    console.log(error);
    return [] as T[];
  }
};
const useClientAppItems = <T,>({ itemType }: { itemType: string }) => {
  const [items, setItems] = useState<(T & { itemType: string; id: string })[]>(
    []
  );
  const auth = useAuthProvider();
  const { status, result, callFunction } = useLoadingState<
    (T & { itemType: string; id: string })[],
    FetchClientItemsProps
  >({
    asyncFunc: fetchClientAppItems,
  });
  //fetch items on mount
  useEffect(() => {
    if (items) return;
    if (!auth) return;
    if (!auth.credentials) return;
    if (!auth.credentials.access_token) return;
    callFunction({ token: auth.credentials.access_token, itemType });
  }, [auth, items, callFunction]);
  //update items on result
  useEffect(() => {
    if (!result) return;
    setItems((state) => {
      if (!state) return result;
      const newArr = [...state, ...result];
      return removeDuplicates(newArr);
    });
  }, [result]);
  return {
    status,
    items,
    setItems,
  };
};
export default useClientAppItems;
