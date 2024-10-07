import { rendersEmailPage } from './lib/emails.js';

const host = location.href;
let main = document.querySelector('main');
document.querySelector('#emails-link').addEventListener('click', async (e) => {
  e.preventDefault();
  const allEmails = document.createElement('div');
  allEmails.id = 'all-emails';
  main.append(allEmails);
  await rendersEmailPage();
});

function rendersDashboard() {

}
