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

// "Card is to vague"
function Card(name, path) {
  const cardDiv  = document.createElement("div");
  cardDiv.setAttribute("class", "skill");
  const imageSVG = document.createElement("img");
  imageSVG.setAttribute("src", `assets/${path}.svg`);
  imageSVG.setAttribute("alt", `${name} logo icon`);
  cardDiv.append(imageSVG);
  return cardDiv;
}

// Displays skills logo
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
    section.scrollIntoView({behavior: "smooth", block: "start"});
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

//Displays list of emails
const emailListDiv = document.querySelector("#email-list");
const emails = [
  {type: "Newsletter", description: "RAW", imageFileName:"katz-newsletter-portfolio.png", filename: "katz-newsletter.html"}
]

function EmailCard(type,description,imageFileName,filename){
  const rootPath = "assets";
  let emailCardDiv = document.createElement("div");
  let emailCardMetaDiv = document.createElement("div");
  let emailCardAnchorImage = document.createElement("a");

  emailCardDiv.className += "email-card";
  emailCardMetaDiv.className += "email-card-meta";
  let metaTypeParagraph = document.createElement("p");
  metaTypeParagraph.textContent = `Type: ${type}`;
  let metaDescriptionParagraph = document.createElement("p");
  metaDescriptionParagraph.textContent = `Description: ${description}`;
  emailCardMetaDiv.append(metaTypeParagraph,metaDescriptionParagraph);

  emailCardAnchorImage.setAttribute("target", "_blank");
  emailCardAnchorImage.setAttribute("href", `emails/${filename}`);
  emailCardAnchorImage.className += "email-image";
  emailCardAnchorImage.style.backgroundImage = `url("${rootPath}/${imageFileName}")`
  emailCardDiv.append(emailCardMetaDiv,emailCardAnchorImage);
  return emailCardDiv;
}

emails.forEach(email => {
  emailListDiv.append(EmailCard(email.type, email.description, email.imageFileName, email.filename));
})


//dynamic hero
