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
      emails.forEach(email => {
        emailList.append(EmailCard(email.title, email.category, email.emailType, email.description, email.viewOnlineFileName,email.imageFileName))
      });
    } else {
        console.info("No emails came back to process.");
    }
  })
  .catch(error => {
    console.error("Error: ", error);
  });

function EmailCard(title, category, emailType, description, viewOnlineFileName, imageFileName) {
  const root = `${location.href}assets`;

  let emailCardDiv = document.createElement("div");
  let emailCardAnchorImage = document.createElement("a");

  emailCardDiv.className += "email-card";
  
  let headingThree = document.createElement("h3");
  headingThree.textContent = `${title}`;
  let emailCategoryTypeDiv = document.createElement('div');
  emailCategoryTypeDiv.className = 'email-category-tag';
  let emailCategoryTag = document.createElement('span');
  emailCategoryTag.textContent = category;
  let emailCategoryDiv = document.createElement('div');
  emailCategoryDiv.className = 'email-category';
  emailCategoryDiv.append(emailCategoryTag);
  emailCategoryTypeDiv.append(emailCategoryDiv);

  let emailTypeSpanDiv = document.createElement('div');
  emailTypeSpanDiv.className = "email-subcategory-type";
  let emailTypeP = document.createElement('span');
  let emailTypeSpan = document.createElement('span');
  emailTypeSpan.className = 'green-tag';
  emailTypeP.textContent = `${emailType}`;
  emailTypeSpan.append(emailTypeP);
  emailTypeSpanDiv.append(emailTypeSpan);

  let emailDescriptionDiv = document.createElement('div');
  emailDescriptionDiv.className = "email-description";
  let emailDescriptionTitle = document.createElement("p");
  emailDescriptionTitle.textContent = "Description:";
  let emailDescription = document.createElement('p');
  emailDescription.textContent = description;
  emailDescriptionDiv.append(emailDescriptionTitle, emailDescription);
  let emailMetaDiv = document.createElement('div');
  emailMetaDiv.className += "email-card-meta";

  emailCardAnchorImage = document.createElement('a');
  emailCardAnchorImage.setAttribute("target", "_blank");
  emailCardAnchorImage.setAttribute("href", `emails/${viewOnlineFileName}`);
  emailCardAnchorImage.className += "email-image";
  emailCardImage = document.createElement('img');

  emailCardImage = document.createElement('div');
  emailCardImage.style.backgroundImage = `url("${root}/${imageFileName}")`;
  emailCardAnchorImage.append(emailCardImage);

  emailCategoryAndTypeCards = document.createElement('div');
  emailCategoryAndTypeCards.className = "email-category-sub-card";

  emailCategoryAndSubTitle = document.createElement("span");
  emailCategoryAndSubTitle.textContent = "Category:";
  emailCategoryAndTypeCards.append(emailCategoryAndSubTitle, emailCategoryTypeDiv, emailTypeSpanDiv);

  // email client verification card
  let emailClientCardsDiv = document.createElement("div");
  emailClientCardsDiv.className = "email-client-cards";
  emailClientHeading = document.createElement("p");
  emailClientHeading.textContent = "Works on:";

  let emailClientImageLogos = [{name:"Gmail", image:"gmail.png"}, {name:"Outlook", image:"outlook.png"}, {name:"Apple Mail", image:"apple-mail.png"}, {name: "Yahoo Mail", image:"yahoo-mail.png"}];
  
  function createEmailClientCard(clientName, clientImage) {
    let host = location.href;
    let assetDir = "assets/";
    let clientCardDiv = document.createElement("div");
    let emailClientName = document.createElement("p");
    emailClientName.textContent = clientName;

    let emailClientImageFrame = document.createElement("div");
    let emailClientImage = document.createElement("img");
    emailClientImage.src = `${host}${assetDir}${clientImage}`;
    emailClientImageFrame.append(emailClientImage);
    clientCardDiv.append(emailClientImageFrame,emailClientName);
    return clientCardDiv;
  }
  let emailClients = document.createElement("div");
  
  emailClientImageLogos.forEach(client => {
    emailClients.append(createEmailClientCard(client.name, client.image));
  });
  console.log(emailClients);
  emailClientCardsDiv.append(emailClientHeading, emailClients);
  emailMetaDiv.append(headingThree, emailCategoryAndTypeCards, emailCardAnchorImage,emailClientCardsDiv, emailDescriptionDiv);
  emailCardDiv.append(emailMetaDiv);
  return emailCardDiv;
}
