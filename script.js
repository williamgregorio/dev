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


// Scroll to top
const homeAnchor = document.querySelector("#scroll-to-top");
homeAnchor.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Scroll to section
const skillsSection = document.querySelector("#skills");
const skillsAnchor = document.querySelector("#scroll-to-skills");
const aboutSection = document.querySelector("#about");
const aboutAnchor = document.querySelector("#scroll-to-about");
const emailsSection = document.querySelector("#emails");
const emailsAnchor = document.querySelector(".scroll-to-emails");
const secondEmailsAnchor = document.querySelector(".call-to-action .scroll-to-emails");

function scrollUser(anchor, section) {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    section.scrollIntoView({behavior: "smooth"});
  })
}

scrollUser(skillsAnchor, skillsSection);
scrollUser(aboutAnchor, aboutSection);
scrollUser(emailsAnchor, emailsSection);
scrollUser(secondEmailsAnchor, emailsSection);

document.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  let scrollPosition = window.scrollY;

  if (scrollPosition > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
