/**
 * Creates an Email Card DOM element representing an email template.
 *
 * @param {Object} emailData - Object containing email details.
 * @param {string} emailData.title - The title of the email.
 * @param {string} emailData.category - The category of the email.
 * @param {string} emailData.emailType - The type/subcategory of the email.
 * @param {string} emailData.description - A brief description of the email.
 * @param {string} emailData.viewOnlineFileName - The file name for the "view online" link.
 * @param {string} emailData.imageFileName - The file name of the email's thumbnail image.
 * @returns {HTMLElement} - The constructed email card element.
 */
function EmailCard({ title, subject, category, emailType, description, viewOnlineFileName, imageFileName }) {
  const root = `${location.href}assets`;

  // Utility to create elements
  const createElement = (tag, options = {}) => {
    const el = document.createElement(tag);
    Object.entries(options).forEach(([key, value]) => {
      if (key === "className") el.className = value;
      else if (key === "textContent") el.textContent = value;
      else if (key === "children") value.forEach(child => el.appendChild(child));
      else el.setAttribute(key, value);
    });
    return el;
  };

  // Email Title
  const titleElement = createElement("h3", { textContent: title });

  // Email Category and Sub Category Yype
  const categoryElement = createElement("div", {
    className: "email-category-tag",
    textContent: category,
  });

  console.log(emailType);
  const typeElement = createElement("span", {
    textContent: `${emailType} dev`,
  });

  const subjectElement = createElement("h4", { textContent: `Subject: ${subject}` });

  const categoryAndTypeSection = createElement("div", {
    className: "email-category-sub-card",
    children: [
      createElement("span", { textContent: "Category:" }),
      createElement("div", { className: "email-category", children: [categoryElement] }),
      createElement("span", { textContent: "Sub Category:" }),
      createElement("div", { className: "email-subcategory-type", children: [ typeElement] }),
    ],
  });

  // Email Description
  const descriptionSection = createElement("div", {
    className: "email-description",
    children: [
      createElement("p", { textContent: "Description:" }),
      createElement("p", { textContent: description }),
    ],
  });

  // Thumbnail
  const thumbnailLink = createElement("a", {
    className: "email-image",
    href: `emails/${viewOnlineFileName}`,
    target: "_blank",
    children: [
      createElement("div", {
        style: `background-image: url('${root}/${imageFileName}')`,
      }),
    ],
  });

  const emailClients = [
    { name: "Gmail", image: "gmail.png" },
    { name: "Outlook", image: "outlook.png" },
    { name: "Apple Mail", image: "apple-mail.png" },
    { name: "Yahoo Mail", image: "yahoo-mail.png" }
  ];

  // Email Clients Section
  const clientsSection = createElement("div", {
    className: "email-client-cards",
    children: [
      createElement("p", { textContent: "Works on:" }),
      createElement("div", {
        className: "email-client-card-list",
        children: emailClients.map(client =>
          createEmailClientCard(client.name, client.image, root)
        ),
      }),
    ],
  });

  // Main Email Card
  return createElement("div", {
    className: "email-card",
    children: [
      createElement("div", {
        className: "email-card-meta",
        children: [titleElement, subjectElement, categoryAndTypeSection, thumbnailLink, clientsSection, descriptionSection],
      }),
    ],
  });
}

/**
 * Helper function to create an email client card.
 *
 * @param {string} clientName - Name of the email client.
 * @param {string} clientImage - Image filename of the email client's logo.
 * @param {string} root - Root path for assets.
 * @returns {HTMLElement} - The client card element.
 */
function createEmailClientCard(clientName, clientImage, root) {
  // *Make this global to access it
  const createElement = (tag, options = {}) => {
    const el = document.createElement(tag);
    Object.entries(options).forEach(([key, value]) => {
      if (key === "className") el.className = value;
      else if (key === "textContent") el.textContent = value;
      else if (key === "children") value.forEach(child => el.appendChild(child));
      else el.setAttribute(key, value);
    });
    return el;
  };

  return createElement("div", {
    className: "client-card",
    children: [
      createElement("div", {
        className: "client-card-frame",
        children: [
          createElement("img", {
            src: `${root}/email-client-logos/${clientImage}`,
            alt: `${clientName} Logo`,
          }),
        ],
      }),
      createElement("p", { textContent: clientName }),
    ],
  });
}

export default EmailCard;
