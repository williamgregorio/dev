async function getEmails() {
  try {
    const host = location.href;
    const emailsResponse = await fetch(`${host}data/emails.json`, {
      method: "GET", 
      headers: {"Content-Type": "application/json"}
    });

    if (!emailsResponse){
      throw new Error("Network errors: ", emailsResponse.status + ' ' + emailsResponse.statusText);
    }

    const emails = await emailsResponse.json();
    return emails;
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

getEmails().then(emails => {
  if (emails && emails.length > 0) {
    const emailListDiv = document.querySelector("#email-list");
    emails.forEach(email => {
      return emailListDiv.append(EmailCard(email.title, email.category, email.emailType, email.description, email.viewOnlineFileName,email.imageFileName))
    });

  } else {
    console.log("No emails to process came back.");
  }
}).catch(error => {
    console.error("Error: ", error);
})

function EmailCard(title, category, emailType, description, viewOnlineFileName, imageFileName) {
  const root = `${location.href}assets`;

  let emailCardDiv = document.createElement("div");
  let emailCardMetaDiv = document.createElement("div");
  let emailCardAnchorImage = document.createElement("a");

  emailCardDiv.className += "email-card";
  
  let headingThree = document.createElement("h3");
  headingThree.textContent = `${title}`;
  let emailCategoryTypeDiv = document.createElement('div');
  emailCategoryTypeDiv.className = 'email-category-tag';
  let emailCategoryTag = document.createElement('p');
  emailCategoryTag.textContent = category;
  emailCategoryTypeDiv.append(emailCategoryTag);

  let emailTypeP = document.createElement("p");
  emailTypeP.textContent = `Category type: ${emailType}`;

  let emailDescriptionDiv = document.createElement('div');
  let emailDescription = document.createElement('p');
  emailDescription.textContent = description;
  emailDescriptionDiv.append(emailDescription);
  let emailMetaDiv = document.createElement('div');
  emailMetaDiv.className += "email-card-meta";
  emailMetaDiv.append(headingThree, emailCategoryTypeDiv, emailTypeP, emailDescriptionDiv);

  emailCardAnchorImage = document.createElement('a');
  emailCardAnchorImage.setAttribute("target", "_blank");
  emailCardAnchorImage.setAttribute("href", `emails/${viewOnlineFileName}`);
  emailCardAnchorImage.className += "email-image";
  emailCardAnchorImage.style.backgroundImage = `url("${root}/${imageFileName}")`;

  emailCardDiv.append(emailMetaDiv, emailCardAnchorImage);
  return emailCardDiv;
}
