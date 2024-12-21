import EmailCard from './components/EmailCard.js';
async function getEmails() {
  try {
    const host = location.href;
    const emailsResponse = await fetch(`${host}data/emails.json`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });

    if (!emailsResponse.ok){
      throw new Error("Network errors: ", emailsResponse.status + ' ' + emailsResponse.statusText);
    }

    const emails = await emailsResponse.json();
    return emails;
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

getEmails().
  then(emails => {
    if (emails && emails.length > 0) {
      let totalEmailsNumber = emails.length;
      let headingTwo = document.querySelector("#emails h2");
      headingTwo.textContent += ` (${totalEmailsNumber})`;

      const emailList = document.querySelector("#email-list");
      emails.forEach(emailData => {
        console.log(emailData)
        const emailCard = EmailCard(emailData)
        emailList.append(emailCard)
      });
    } else {
        console.info("No emails came back to process.");
    }
  })
  .catch(error => {
    console.error("Error: ", error);
  });
