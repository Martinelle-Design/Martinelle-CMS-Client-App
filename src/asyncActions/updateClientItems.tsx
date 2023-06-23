import axios from "axios";

const restApiUrl = `https://${process.env.REACT_APP_API_ENDPOINT}/manage-content/`;
const updateClientItems = async <T,>({
  itemType,
  data,
  token,
}: {
  itemType: string;
  data: Partial<T> & {
    pk: {
      itemType: string;
      timestamp: number | string;
    };
  };
  token: string;
}) => {
  try {
    const result = await axios({
      url: `${restApiUrl}${itemType}`,
      method: "POST",
      data: {
        ...data,
        key: data.pk,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (err) {
    console.error(err);
    return;
  }
};
export default updateClientItems;
