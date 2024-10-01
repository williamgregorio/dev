import { fetchData } from './lib/fetch-data.js';
import { TotalEmailsCard } from './lib/components/TotalEmailsCard.js';

const main = document.querySelector("main");
const host = location.href;
console.log(host);
fetchData(`${host}api/emails`).then(data => {
  renderTotalEmails(data);

  main.append(TotalEmailsCard(data.length, "Total emails:"));

}).catch(err => {
    console.error(err);
  })


// dashboard present emails

function renderTotalEmails(data) {
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
  }
}

