import { rendersEmailPage } from './lib/emails.js';
import { renderSectionPage } from './lib/sections.js';

const host = location.href;
let main = document.querySelector('main');
document.querySelector('#emails-link').addEventListener('click', async (e) => {
  e.preventDefault();
  main.innerHTML = '';
  const allEmails = document.createElement('div');
  allEmails.id = 'all-emails';
  main.append(allEmails);
  await rendersEmailPage();
});

function rendersDashboard() {
  main.innerHTML = '';
  const h1 = document.createElement('h1');
  h1.textContent = 'Welcome';
  renderSectionPage();
  main.append(h1);
}

document.querySelector('#dashboard-link').addEventListener('click', (e) => {
  e.preventDefault();
  rendersDashboard();
});

rendersDashboard();
