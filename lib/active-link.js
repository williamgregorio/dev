console.log(`\r\n  _      __    __   _____ ____  \r\n | | \/| \/ ___ \/ \/  \/ __(_\/ \/ \/__\r\n | |\/ |\/ \/ -_\/ _ \\_\\ \\\/ \/ \/  \'_\/\r\n |__\/|__\/\\__\/_.__\/___\/_\/_\/_\/\\_\\ \r\n                                \r\n`);
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
