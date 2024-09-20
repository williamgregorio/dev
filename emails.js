console.log("emails");


async function getEmails() {
  try {
    const emailTypesResponse = await fetch("data/email-types.json", {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const emailsResponse = await fetch("data/emails.json", {
      method: "GET", 
      headers: {"Content-Type": "application/json"}
    });

    if (!emailTypesResponse.ok && !emailsResponse){
      throw new Error("Network errors: ", emailsResponse.status + ' ' + emailsResponse.statusText + ' | ' + emailTypesResponse.status + emailTypesResponse.statusText);
    }

    const emailTypes = await emailTypesResponse.json();
    const emails = await emailsResponse.json();

    const emailProjects = emails.map(email => ({
      ...email, 
      type: emailTypes[email.type][email.typeIndex]
    }));

    return emailProjects;

  } catch (error) {
    console.error("Error: ", error.message);
  }
}

getEmails().then(emails => {
  if (emails && emails.length > 0) {
    console.log(emails);
    const emailListDiv = document.querySelector("#email-list");

  } else {
    console.log("No emails to process came back.");
  }
}).catch(error => {
    console.error("Error: ", error);
})

function EmailCard(type, description, imageFile, fileName) {
  const root = "assets";

  let emailCardDiv = document.createElement("div");
  let emailCardMetaDiv = document.createElement("div");
  let emailCardAnchorImage = document.createElement("img");

  emailCardDiv.className += "email-card";
  emailCardMetaDiv.className += "email-card-meta";
  
  let metaTypeHeadingThree = document.createElement("h3");
  metaTypeHeadingThree.textContent = `${type}`;

  let metaDescriptionParagraph = document.createElement("p");
  metaDescriptionParagraph.textContent = `${description}`;

  emailCardDiv.append(metaTypeHeadingThree, metaDescriptionParagraph);

  emailCardAnchorImage.setAttribute("target", "_blank");
  emailCardAnchorImage.setAttribute("href", `emails/${fileName}`);
  emailCardAnchorImage.className += "email-image";
  emailCardAnchorImage.style.backgroundImage = `url("${root}/${imageFile}")`;

  emailCardDiv.append(emailCardMetaDiv, emailCardAnchorImage);
  return emailCardDiv;
}

