/**
 * Scrolls the user to the specified section when an anchor element is clicked.
 * @param {HTMLElement} anchor - The clickable element triggering the scroll.
 * @param {HTMLElement} section - The target section to scroll to.
 */
function scrollUser(anchor, section) {
  if (!anchor || !section) {
    console.warn("scrollUser: Anchor or section element is missing.");
    return;
  }
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// Scroll to top functionality
(function setupScrollToTop() {
  const heroAnchor = document.querySelector("#scroll-to-top");
  if (heroAnchor) {
    heroAnchor.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth", 
      });
    });
  } else {
    console.warn("setupScrollToTop: Hero anchor (#scroll-to-top) not found.");
  }
})();

// Set up section scrolling
(function setupSectionScrolling() {
  const sections = [
    { anchor: "#scroll-to-skills", section: "#skills" },
    { anchor: "#scroll-to-about", section: "#about" },
    { anchor: "#scroll-to-emails", section: "#emails" },
    { anchor: ".scroll-to-emails", section: "#emails" }, 
  ];

  sections.forEach(({ anchor, section }) => {
    const anchorElement = document.querySelector(anchor);
    const sectionElement = document.querySelector(section);
    scrollUser(anchorElement, sectionElement);
  });
})();

// Header behavior on scroll
(function setupHeaderScrollEffect() {
  const header = document.querySelector("header");
  if (!header) {
    console.warn("setupHeaderScrollEffect: Header element not found.");
    return;
  }

  document.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
})();
