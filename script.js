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
  {name:"Salesforce", path:"salesforce"},
  {name:"WordPress", path:"wordpress"},
  {name:"Shopify", path:"shopify"}
]

const emailTypes = {
  transactional: [
    "Order Confirmation",
    "Shipping Confirmation",
    "Password Reset",
    "Account Creation",
    "Payment Receipt"
  ],
  promotional: [
    "Product Announcements",
    "Sales and Discounts",
    "Newsletters",
    "Event Invitations",
    "Seasonal Campaigns"
  ],
  engagement: [
    "Welcome Emails",
    "Re-engagement Emails",
    "Survey Requests"
  ],
  behavioral: [
    "Abandoned Cart",
    "Browse Abandonment",
    "Product Recommendations"
  ],
  informational: [
    "Company Updates",
    "Educational Content"
  ]
};

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
const heroAnchor = document.querySelector("#scroll-to-top");
heroAnchor.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "instant"
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
    section.scrollIntoView({behavior: "instant", block: "start"});
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
  {type: emailTypes.promotional[0], description: "A responsive promotional email for a new product announcement, written in pure HTML.", imageFileName:"katz-newsletter-portfolio.png", filename: "katz-promotional-product-announcement.html"}
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

//active state evaluator
const observerOptions = {
  root: null,
  rootMargin: '0px', 
  threshold: 0.7
}

const sections = document.querySelectorAll("sections");

const observerCallback = (entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute("id");
    const navLink = document.querySelector(`nav a[href="#${id}"]`);

    if (entry.isIntersecting) {
      navLink.classList.add("active");
    } else {
      navLink.classList.remove("active");
    }
  });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);

document.querySelectorAll("section").forEach(section => {
  observer.observe(section);
})

