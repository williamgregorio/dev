/**
 * Toggle active state on navigation links with intersection observer.
 * @module activeLink
 */

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

/**
 * Handles the changes for observed sections
 * @param {IntersectionObserverEntry[]} entries - array of observed
 * @param {IntersectionObserver} observer - the instance
 */
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id");
    const navLink = document.querySelector(`nav a[href="#${id}"]`);
    if (navLink) {
      if (entry.isIntersecting) {
        navLink.classList.add("active");
      } else {
        navLink.classList.remove("active");
      }
    } else {
      console.warn(`No link found for section: #${id}`);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  if (section.id) {
    observer.observe(section);
  } else {
    console.warn(`Skipping section with no id: ${section}`);
  }
});
