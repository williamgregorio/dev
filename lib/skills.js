import SkillCard from './components/SkillCard.js';

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
