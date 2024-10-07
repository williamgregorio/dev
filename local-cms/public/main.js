import { rendersEmailPage } from './lib/emails.js';

const host = location.href;

document.querySelector('#emails-link').addEventListener('click', async (e) => {
  e.preventDefault();
  await rendersEmailPage();
});

