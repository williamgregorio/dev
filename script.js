const skills = [
  { name: "HTML5", path: "html5" },
  { name: "CSS3", path: "css3" },
  { name: "JavaScript", path: "javascript" },
  { name: "PHP", path: "php" },
  { name: "Mautic", path: "mautic" },
  { name: "Matomo", path: "matomo" },
  { name: "MJML", path: "mjml" },
  { name: "GA4", path: "google-analytics" },
  { name: "Figma", path: "figma" },
  { name: "Salesforce", path: "salesforce" },
  { name: "WordPress", path: "wordpress" },
  { name: "Shopify", path: "shopify" },
];

const emailTypes = {
  transactional: [
    "Order Confirmation",
    "Shipping Confirmation",
    "Password Reset",
    "Account Creation",
    "Payment Receipt",
  ],
  promotional: [
    "Product Announcements",
    "Sales and Discounts",
    "Newsletters",
    "Event Invitations",
    "Seasonal Campaigns",
  ],
  engagement: ["Welcome Emails", "Re-engagement Emails", "Survey Requests"],
  behavioral: [
    "Abandoned Cart",
    "Browse Abandonment",
    "Product Recommendations",
  ],
  informational: ["Company Updates", "Educational Content"],
};

// Skill card dom rendering
function SkillCard(name, path) {
  const cardDiv = document.createElement("div");
  cardDiv.setAttribute("class", "skill");

  const logoNameSpan = document.createElement("span");
  logoNameSpan.textContent = name;

  const imageSVGDiv = document.createElement("div");
  imageSVGDiv.style.backgroundImage = `url("assets/${path}.svg")`;
  imageSVGDiv.className += "skill-image";

  cardDiv.append(logoNameSpan, imageSVGDiv);
  return cardDiv;
}

// Displays skills logo
const skillList = document.querySelector("#skill-list");

skills.forEach((skill) => {
  skillList.append(SkillCard(skill.name, skill.path));
  return skillList;
});

// Scroll to top
const heroAnchor = document.querySelector("#scroll-to-top");
heroAnchor.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
});

// Scroll to section
const skillsSection = document.querySelector("#skills");
const skillsAnchor = document.querySelector("#scroll-to-skills");
const aboutSection = document.querySelector("#about");
const aboutAnchor = document.querySelector("#scroll-to-about");
const emailsSection = document.querySelector("#emails");
const emailsAnchor = document.querySelector(".scroll-to-emails");

function scrollUser(anchor, section) {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    section.scrollIntoView({ behavior: "instant", block: "start" });
  });
}

scrollUser(skillsAnchor, skillsSection);
scrollUser(aboutAnchor, aboutSection);
scrollUser(emailsAnchor, emailsSection);

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
  {
    type: emailTypes.promotional[0],
    description: "A responsive email for a new product announcement.",
    imageFileName: "katz-newsletter-portfolio.png",
    filename: "katz-promotional-product-announcement.html",
  },
  {
    type: emailTypes.transactional[4],
    description:
      "A responsive new payment receipt email for a service business.",
    imageFileName: "stripe-first-transaction.png",
    filename: "stripe-transactional-payment-receipt.html",
  },
  {
    type: emailTypes.promotional[1],
    description: "A responsive new promotional email for a special discount.",
    imageFileName: "instacart-discount-promo.png",
    filename: "instacart-discount-promotional.html",
  },
];

function EmailCard(type, description, imageFileName, filename) {
  const rootPath = "assets";
  let emailCardDiv = document.createElement("div");
  let emailCardMetaDiv = document.createElement("div");
  let emailCardAnchorImage = document.createElement("a");

  emailCardDiv.className += "email-card";
  emailCardMetaDiv.className += "email-card-meta";
  let metaTypeHeadingThree = document.createElement("h3");
  metaTypeHeadingThree.textContent = `Type: ${type}`;
  let metaDescriptionParagraph = document.createElement("p");
  metaDescriptionParagraph.textContent = `Description: ${description}`;
  emailCardMetaDiv.append(metaTypeHeadingThree, metaDescriptionParagraph);

  emailCardAnchorImage.setAttribute("target", "_blank");
  emailCardAnchorImage.setAttribute("href", `emails/${filename}`);
  emailCardAnchorImage.className += "email-image";
  emailCardAnchorImage.style.backgroundImage = `url("${rootPath}/${imageFileName}")`;
  emailCardDiv.append(emailCardMetaDiv, emailCardAnchorImage);
  return emailCardDiv;
}

emails.forEach((email) => {
  emailListDiv.append(
    EmailCard(
      email.type,
      email.description,
      email.imageFileName,
      email.filename,
    ),
  );
});

//active state evaluator
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7,
};

const sections = document.querySelectorAll("sections");

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id");
    const navLink = document.querySelector(`nav a[href="#${id}"]`);

    if (entry.isIntersecting) {
      navLink.classList.add("active");
    } else {
      navLink.classList.remove("active");
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

/*
READ ALOUD TIME
2:03
mins:secs
SILENT READING TIME
1:37
mins:secs
WORDS
373
CHARACTERS
2362
*/
let timerStartTime;
let timerRunning = false;
let scrollCount = 0;
const maxScrollCount = 2;
let scrollTimes = [];
let timerTimeout;

function startTimer() {
  if (!timerRunning) {
    timerStartTime = new Date().getTime();
    timerRunning = true;
    console.log(`Starting timer cycle number: ${scrollCount + 1}`);
    clearTimeout(timerTimeout);
  }
}

function stopTimer() {
  if (!timerRunning) return;

  const timerEndTime = new Date().getTime();
  const timeTaken = (timerEndTime - timerStartTime) / 1000;
  console.log(`Time take to reach the bottom page: ${timeTaken} seconds`);

  scrollTimes.push({
    cycle: scrollCount + 1,
    timeTaken: timeTaken,
  });

  timerRunning = false;
  scrollCount++;

  if (scrollCount >= maxScrollCount) {
    console.log("Maximum scroll count reached");
    window.removeEventListener("scroll", checkUserScrollPosition);
    showPopup();
  } else {
    console.log("Scroll back to top to start a new cycle");
  }
}

function checkUserScrollPosition() {
  const scrollTop = window.scrollY || window.pageYOffset;
  const documentHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;

  if (scrollTop + viewportHeight >= documentHeight) {
    if (timerRunning) {
      console.log(`Cycle number: ${scrollCount + 1}, touched bottom document`);
      stopTimer();
      console.log(scrollTimes);
    }
  } else if (scrollTop === 0) {
    if (!timerRunning && scrollCount < maxScrollCount) {
      console.log("User touched top of page, resetting timer.");
      startTimer();
    }
  }
}

const main = document.querySelector("main");

function Popup() {}
function showPopup() {}
function closePopup() {}

function handleNocrollUpTimeout() {
  timerTimeout = setTimeout(() => {
    if (!timerRunning) {
      window.removeEventListener("scroll", checkUserScrollPosition);
      console.log("No scroll up detected after detected, displaying data");
      showPopup();
    }
  }, 10000);
}

function inititalizeScrollTracking() {
  window.addEventListener("scroll", checkUserScrollPosition);
  startTimer();
  handleNocrollUpTimeout();
}

window.addEventListener("load", inititalizeScrollTracking);
