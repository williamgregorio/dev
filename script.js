const skills = [
  {name:"HTML5", path:"html5"},
  {name:"CSS3", path:"css3"},
  {name:"JavaScript", path:"javascript"},
  {name:"PHP", path:"php"},
  {name:"Mautic", path:"mautic"},
  {name:"Matomo", path:"matomo"},
  {name:"Google AdWords", path:"googleads"},
  {name:"GA4", path:"google-analytics"},
  {name:"Figma", path:"figma"},
]

function Card(name, path) {
  const cardDiv  = document.createElement("div");
  cardDiv.setAttribute("class", "skill");
  const imageSVG = document.createElement("img");
  imageSVG.setAttribute("src", `assets/${path}.svg`);
  imageSVG.setAttribute("alt", `${name} logo icon`);
  cardDiv.append(imageSVG);
  return cardDiv;
}

const skillList = document.querySelector("#skill-list");

skills.forEach(skill => {
  skillList.append(Card(skill.name, skill.path))
  return skillList;
})


// Scroll to section "make easier to not write to much"
const skillsSection = document.querySelector("#skills");
const skillsAnchor = document.querySelector("#scroll-to-skills");
const aboutSection = document.querySelector("#about");
const aboutAnchor = document.querySelector("#scroll-to-about");

function scrollUser(anchor, section) {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    section.scrollIntoView({behavior: "smooth"});
  })
}

scrollUser(skillsAnchor, skillsSection);
scrollUser(aboutAnchor, aboutSection);

document.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  let scrollPosition = window.scrollY;

  if (scrollPosition > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
