/**
 * Creates a Skill Card DOM element representing a skill with a name and an SVG logo.
 *
 * @param {string} name - The name of the skill (e.g., "JavaScript").
 * @param {string} path - The file path (without extension) to the skill's SVG image.
 * @returns {HTMLElement} - The constructed skill card element.
 */
function SkillCard(name, path) {
  // Create the main container for the skill card
  const cardDiv = document.createElement("div");
  cardDiv.className = "skill";

  // Add the skill name
  const logoNameSpan = document.createElement("span");
  logoNameSpan.textContent = name;

  // Add the SVG image representing the skill
  const imageSVG = createSkillImage(path);

  // Assemble the skill card
  cardDiv.append(logoNameSpan, imageSVG);

  return cardDiv;
}

/**
 * Helper function to create the SVG image element for the skill card.
 *
 * @param {string} path - The file path (without extension) to the SVG image.
 * @returns {HTMLElement} - A DOM element representing the SVG image.
 */
function createSkillImage(path) {
  const imageDiv = document.createElement("div");
  imageDiv.style.backgroundImage = `url("assets/${path}.svg")`;
  imageDiv.className = "skill-image";

  return imageDiv;
}

// Export the SkillCard function for use in other modules
export default SkillCard;
