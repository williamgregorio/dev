import createElement from "../util/createElement.js";
import capitalize from "../util/capitalize.js";

const root = `${location.href}assets`;

/**
 * Creates an Email Card DOM element representing an email template.
 *
 * @param {Object} emailData - Object containing email details.
 * @param {string} emailData.title - The title of the email.
 * @param {string} emailData.subject - The subject of the email.
 * @param {string} emailData.category - The category of the email.
 * @param {string} emailData.emailType - The type/subcategory of the email.
 * @param {string} emailData.description - A brief description of the email.
 * @param {string} emailData.viewOnlineFileName - The file name for the "view online" link.
 * @param {string} emailData.imageFileName - The file name of the email's thumbnail image.
 * @returns {HTMLElement} - The constructed email card element.
 */
function EmailCard({ title, subject, category, emailType, viewOnlineFileName, imageFileName }) {
  const emailClients = [
    { name: "Gmail", image: "gmail.png" },
    { name: "Outlook", image: "outlook.png" },
    { name: "Apple Mail", image: "apple-mail.png" },
    { name: "Yahoo Mail", image: "yahoo-mail.png" }
  ];

  const clientsSection = createElement("div", {
    className: "email-client-cards",
    children: [
      createElement("p", { textContent: "Works on:" }),
      createElement("div", {
        className: "email-client-card-list",
        children: emailClients.map(({ name, image }) => createElement("div", {
          className: "client-card",
          children: [
            createElement("div", {
              className: "client-card-frame",
              children: [
                createElement("img", { src: `${root}/email-client-logos/${image}`, alt: `${name} Logo` })
              ]
            }),
            createElement("p", { textContent: name })
          ]
        }))
      })
    ]
  });

  return createElement("div", {
    className: "email-card",
    dataset: { category: category, type: emailType },
    children: [
      createElement("h3", { textContent: title }),
      createElement("h4", { textContent: `Subject: ${subject}` }),
      createElement("div", {
        className: "email-category-sub-card",
        children: [
          createElement("span", { textContent: "Category:" }),
          createElement("div", { className: "email-category", textContent: capitalize(category) }),
          createElement("span", { textContent: "Sub Category:" }),
          createElement("div", { className: "email-subcategory-type", textContent: emailType })
        ]
      }),
      createElement("a", {
        className: "email-image",
        href: `emails/${viewOnlineFileName}`,
        target: "_blank",
        children: [
          createElement("div", { style: `background-image: url('${root}/${imageFileName}')` })
        ]
      }),
      clientsSection
    ]
  });
}

export default EmailCard;
