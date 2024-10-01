import { fetchData } from './lib/fetch-data.js';

fetchData("http://localhost:3000/api/emails").then(data => {
  console.log(data);
}).catch(err => {
    console.error(err);
  })


