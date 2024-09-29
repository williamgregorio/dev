console.log("sections");
const main = document.querySelector("main");

if (main) {
  const heroSection = createSection("hero");

  let html = 
    `<div id="hero-content">
        <div id="hero-header">
          <div>
            <span class="green-tag">
              <span class="green-tag-icon"></span>
              <span>Available for hire</span>
          </span></div>
          <h1>Looking for the right Email Developer?</h1> 
        </div>

       <div class="rich-text-content">
        <p>I don't just code emails, I collaborate and develop strategic emails with your team to bring the best result.</p>
        <p>Don't believe me?</p> 
        <p>Scroll down further to take a look.</p>
      </div>
    </div>
    <div id="hero-image">
      <img src="assets/profile-cover.png" alt="an face image of william gregorio">
    </div>
    `;

  addSectionHTML(heroSection, html);
  console.log(heroSection);

} else {
  throw new Error("Main tag is missing.");
}

function createSection(idName) {
  const section = document.createElement("section");
  section.setAttribute("id", idName);
  return section;
}

function addSectionHTML(section, html) {
  if (section.children.length >= 0) {
    return section.innerHTML += html;
  }
  throw new Error("Section tag is missing.");
}

function addSectionToDom(section){}

