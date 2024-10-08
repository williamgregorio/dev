import { fetchData } from "./fetch-data.js";

const host = location.href;
async function updateEmail(index, title, category, typeIndex, emailType, description, image) {
  const emailData = { title, category, typeIndex, emailType, description, imageFileName: image }

  try {
    const response = await fetch(`${host}api/emails/${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error('Failed to update at ', index);
    }

    return await fetchData(`${host}api/emails`);
  } catch (error) {
    console.error('Network error: ', error);
  }
}

export { updateEmail };
