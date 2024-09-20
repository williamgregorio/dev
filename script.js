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
