/**
 * Creates an Email Card DOM element representing an email template.
 *
 * @param {string} props.title - The title of the email.
 * @param {string} props.category - The category of the email.
 * @param {string} props.emailType - The type/subcategory of the email.
 * @param {string} props.description - A brief description of the email.
 * @param {string} props.viewOnlineFileName - The file name for the "view online" link.
 * @param {string} props.imageFileName - The file name of the email's thumbnail image.
 * @returns {HTMLElement} - The constructed email card element.
 */
function EmailCard(title, category, emailType, description, viewOnlineFileName, imageFileName) {
  const root = `${location.href}assets`;

  // Create the main container for the email card
  const emailCardDiv = document.createElement("div");
  emailCardDiv.className = "email-card";

  // Add the email title
  const headingThree = document.createElement("h3");
  headingThree.textContent = title;

  // Create the email category tag
  const emailCategoryDiv = document.createElement("div");
  emailCategoryDiv.className = "email-category";
  const emailCategoryTag = document.createElement("div");
  emailCategoryTag.className = "email-category-tag";
  const emailCategorySpan = document.createElement("span");
  emailCategoryTag.textContent = category;
  emailCategoryDiv.append(emailCategoryTag);

  // Wrap category and subcategory details
  const emailCategoryAndTypeDiv = document.createElement("div");
  emailCategoryAndTypeDiv.className = "email-category-sub-card";
  const emailCategoryTitle = document.createElement("span");
  emailCategoryTitle.textContent = "Category:";
  emailCategoryAndTypeDiv.append(emailCategoryTitle, emailCategoryDiv);

  // Create the email type tag
  const emailTypeSpanDiv = document.createElement("div");
  emailTypeSpanDiv.className = "email-subcategory-type";
  const emailTypeSpan = document.createElement("span");
  emailTypeSpan.className = "green-tag";
  emailTypeSpan.textContent = emailType;
  emailTypeSpanDiv.append(emailTypeSpan);

  emailCategoryAndTypeDiv.append(emailTypeSpanDiv);

  // Add the email description
  const emailDescriptionDiv = document.createElement("div");
  emailDescriptionDiv.className = "email-description";
  const emailDescriptionTitle = document.createElement("p");
  emailDescriptionTitle.textContent = "Description:";
  const emailDescriptionText = document.createElement("p");
  emailDescriptionText.textContent = description;
  emailDescriptionDiv.append(emailDescriptionTitle, emailDescriptionText);

  // Add the thumbnail image with a clickable link
  const emailCardAnchorImage = document.createElement("a");
  emailCardAnchorImage.target = "_blank";
  emailCardAnchorImage.href = `emails/${viewOnlineFileName}`;
  emailCardAnchorImage.className = "email-image";
  const emailCardImage = document.createElement("div");
  emailCardImage.style.backgroundImage = `url("${root}/${imageFileName}")`;
  emailCardAnchorImage.append(emailCardImage);

  // Create a section for email client compatibility
  const emailClientCardsDiv = document.createElement("div");
  emailClientCardsDiv.className = "email-client-cards";
  const emailClientHeading = document.createElement("p");
  emailClientHeading.textContent = "Works on:";
  const emailClientsList = document.createElement("div");
  emailClientsList.className = "email-client-card-list";

  // List of supported email clients with logos
  const emailClientImageLogos = [
    { name: "Gmail", image: "gmail.png" },
    { name: "Outlook", image: "outlook.png" },
    { name: "Apple Mail", image: "apple-mail.png" },
    { name: "Yahoo Mail", image: "yahoo-mail.png" }
  ];

  // Populate the email client list using the helper function
  emailClientImageLogos.forEach(client =>
    emailClientsList.append(createEmailClientCard(client.name, client.image, root))
  );

  emailClientCardsDiv.append(emailClientHeading, emailClientsList);

  // Assemble all sections of the email card
  const emailMetaDiv = document.createElement("div");
  emailMetaDiv.className = "email-card-meta";
  emailMetaDiv.append(
    headingThree,
    emailCategoryAndTypeDiv,
    emailTypeSpanDiv,
    emailCardAnchorImage,
    emailClientCardsDiv,
    emailDescriptionDiv
  );

  emailCardDiv.append(emailMetaDiv);
  return emailCardDiv;
}

/**
 * Helper function to create a single email client compatibility card.
 *
 * @param {string} clientName - The name of the email client (e.g., "Gmail").
 * @param {string} clientImage - The image file name of the email client's logo.
 * @param {string} root - The root directory for assets.
 * @returns {HTMLElement} - A DOM element representing the email client card.
 */
function createEmailClientCard(clientName, clientImage, root) {
  const clientCardDiv = document.createElement("div");
  clientCardDiv.className = "client-card";

  const emailClientImageFrame = document.createElement("div");
  emailClientImageFrame.className = "client-card-frame";
  const emailClientImage = document.createElement("img");
  emailClientImage.src = `${root}/email-client-logos/${clientImage}`;
  emailClientImage.alt = `${clientName} Logo`;
  emailClientImageFrame.append(emailClientImage);

  const emailClientName = document.createElement("p");
  emailClientName.textContent = clientName;

  clientCardDiv.append(emailClientImageFrame, emailClientName);
  return clientCardDiv;
}

// Export the EmailCard function for use in other modules
export default EmailCard;
