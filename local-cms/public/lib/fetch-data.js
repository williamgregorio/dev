export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network request failed.");
    }
    const data = await response.json();
    return data;
  } catch(err) {
    console.error("Error on fetchData: ", err);
    throw err;
  }
}


