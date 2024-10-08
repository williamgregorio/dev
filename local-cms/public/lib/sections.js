import { fetchData } from "./fetch-data.js";

const host = location.href;
export async function renderSectionPage() {
  injectStyles();
  const sectionsData = await fetchData(`${host}api/sections`);
  renderSections(sectionsData.sections);
}

function renderSections(sections) {
  const main = document.querySelector('main');
  main.innerHTML = '';
  sections.forEach(section => {
    const sectionElement = createSectionElement(section);
    sectionElement.id = section.id;
    main.append(sectionElement);
  });
}

function createSectionElement(section) {
  const sectionElement = document.createElement('section');
  sectionElement.id = section.id;

  switch (section.type) {
    case 'hero':
      sectionElement.innerHTML = `
        <div id="hero-content">
          <div id="hero-header">
            <div>
              <span class="green-tag">
                <span class="green-tag-icon"></span>
                <span>${section.content.tagline}</span>
              </span>
            </div>
            <h1>${section.content.header}</h1>
          </div>
          <div class="rich-text-content">
            <p>${section.content.description}</p>
            <p>Don't believe me?</p>
            <p>Scroll down further to take a look.</p>
          </div>
        </div>
        <div id="hero-image">
          <img src="http://localhost:8080/${section.content.image}" alt="an image of ${section.content.header}">
        </div>
      `;
      break;

    case 'skills':
      sectionElement.innerHTML = `
        <h2>${section.content.header}</h2>
        <div id="skill-list"></div> 
      `;
      break;

    case 'emails':
      sectionElement.innerHTML = `
        <h2>${section.content.header}</h2>
        <div id="email-list"></div> 
      `;
      break;

    case 'about':
      sectionElement.innerHTML = `
        <div id="about-content">
          <img src="http://localhost:8080/${section.content.image}" alt="an image related to ${section.content.header}">
          <h2>${section.content.header}</h2>
          <p>${section.content.paragraphs}</p>
        </div>
      `;
      break;

    default:
      sectionElement.innerHTML = `<h2>Section not found</h2>`;
      break;
  }

  return sectionElement;
}
