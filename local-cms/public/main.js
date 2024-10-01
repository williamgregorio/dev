import { fetchData } from './lib/fetch-data.js';
import { TotalEmailsCard } from './lib/components/TotalEmailsCard.js';

const main = document.querySelector("main");

fetchData("http://localhost:3000/api/emails").then(data => {
  console.log(data);
}).catch(err => {
    console.error(err);
  })


// dashboard present emails

function renderTotalEmails() {}

main.append(TotalEmailsCard());
