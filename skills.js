async function getSkills() {
  try {
    const response = await fetch("https://williamgregorio.com/data/skills.json", {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    if (!response.ok) {
      throw new Error("Network request failed.", response.status + ' ' + response.statusText);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error: ", error.message);
    return null;
  }
}

getSkills().then(skills => {
  if (skills) {
    console.log(skills);
  } else {
    console.log("No skills to process came back :(");
  }
});
