async function getSkills() {
  try {
    const response = await fetch("data/skills.json", {
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
    const skillList = document.querySelector("#skill-list");
    skills.forEach((skill) => {
      skillList.append(SkillCard(skill.name, skill.path));
    })
  } else {
    console.log("No skills came back.");
  }
});

function SkillCard(name, path) {
  let cardDiv = document.createElement("div");
  cardDiv.className += "skill";

  let logoNameSpan = document.createElement("span");
  logoNameSpan.textContent = name;

  let imageSVG = document.createElement("div");
  imageSVG.style.backgroundImage = `url("assets/${path}.svg")`;
  imageSVG.className += "skill-image";

  cardDiv.append(logoNameSpan, imageSVG);
  return cardDiv;
}
