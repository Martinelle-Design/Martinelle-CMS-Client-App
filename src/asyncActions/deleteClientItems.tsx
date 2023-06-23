import axios from "axios";
const restApiUrl = `https://${process.env.REACT_APP_API_ENDPOINT}/manage-content/`;
const deleteClientItems = async <T,>({
  itemType,
  data,
  token,
}: {
  itemType: string;
  data: T & {
    pk: {
      timestamp: number | string;
      itemType: string;
    };
  };
  token: string;
}) => {
  try {
    const result = await axios({
      url: `${restApiUrl}${itemType}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        key: JSON.stringify(data.pk),
      },
    });
    return result.data;
  } catch (err) {
    console.error(err);
    return;
  }
};

export default deleteClientItems;
