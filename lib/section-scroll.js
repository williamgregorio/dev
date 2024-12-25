/**
 * Smoothly scrolls to target sections on click.
 * @module sectionScroll
 */

document.querySelectorAll(`[data-scroll-to]`).forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Header behavior on scroll :todo(seperate)
function setupHeaderScrollEffect() {
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
};

setupHeaderScrollEffect();
