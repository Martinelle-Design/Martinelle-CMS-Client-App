import axios from "axios";
const restApiUrl = `https://${process.env.REACT_APP_API_ENDPOINT}/manage-content/`;
const addClientItems = async <T,>({
  itemType,
  data,
  token,
}: {
  itemType: string;
  data: T;
  token: string;
}) => {
  try {
    const result = await axios({
      url: `${restApiUrl}${itemType}`,
      method: "PUT",
      data: data,
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
export default addClientItems;
