import { QueryCommandOutput } from "@aws-sdk/client-dynamodb";
import axios from "axios";
export type FetchClientItemsProps = {
  token: string;
  itemType: string;
};
export type GeneralFetchData = {
  message: string;
  result: Omit<QueryCommandOutput, "$metadata" | "Items">;
};
export type ClientAppItemData<T> = GeneralFetchData & {
  result: {
    Items: T[];
  };
};
const restApiUrl = `https://${process.env.REACT_APP_API_ENDPOINT}/manage-content/`;
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
      params: {
        max: 1000,
      },
    });
    console.log(data);
    return data as ClientAppItemData<T>;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default fetchClientAppItems;