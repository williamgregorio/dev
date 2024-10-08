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
    clearTimeout(timerTimeout);
  }
}

function stopTimer() {
  if (!timerRunning) return;

  const timerEndTime = new Date().getTime();
  const timeTaken = (timerEndTime - timerStartTime) / 1000;

  scrollTimes.push({
    cycle: scrollCount + 1,
    timeTaken: timeTaken,
  });

  timerRunning = false;
  scrollCount++;

  if (scrollCount >= maxScrollCount) {
    window.removeEventListener("scroll", checkUserScrollPosition);
    showPopup();
  } else {
  }
}

function checkUserScrollPosition() {
  const scrollTop = window.scrollY || window.pageYOffset;
  const documentHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;

  if (scrollTop + viewportHeight >= documentHeight) {
    if (timerRunning) {
      stopTimer();
    }
  } else if (scrollTop === 0) {
    if (!timerRunning && scrollCount < maxScrollCount) {
      startTimer();
    }
  }
}

function Popup() {}
function showPopup() {}
function closePopup() {}

function handleNocrollUpTimeout() {
  timerTimeout = setTimeout(() => {
    if (!timerRunning) {
      window.removeEventListener("scroll", checkUserScrollPosition);
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
