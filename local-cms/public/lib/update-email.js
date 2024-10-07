import { fetchData } from "./fetch-data";

const host = location.href;
async function updateEmail(index, type, description, image) {
  const emailData = {type, description, imageFileName: image}

  try {
    const response = await fetch(`${host}api/emails/${index}`,{
      method: "PUT",
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error('Failed to update at ', index);
    }

    return await fetchData(`${host}api/emails`);
  } catch (error) {
  }
}

export { updateEmail };
