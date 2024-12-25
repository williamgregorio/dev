import createElement from "./util/createElement.js";
import capitalize from "./util/capitalize.js";

document.addEventListener("DOMContentLoaded", () => {

  function initializeEmailCards() {
    const emailCards = Array.from(document.querySelectorAll(".email-card"));
    if (!emailCards.length) return; 
    const categories = [...new Set(emailCards.map(card => card.dataset.category))];
    const categoryTypesSelect = document.querySelector("#category-types");

    categories.forEach(category => {
      categoryTypesSelect.appendChild(
        createElement("option", { value: category, textContent: capitalize(category) })
      );
    });

    categoryTypesSelect.addEventListener("change", (e) => {
      const selectedCategory = e.target.value;
      const emailListParentNode = document.querySelector("#email-list");
      emailListParentNode.innerHTML = ""; 

      const filteredEmails = selectedCategory === "all"
        ? emailCards
        : emailCards.filter(card => card.dataset.category === selectedCategory);

      // Updates the email <int>list and heading
      filteredEmails.forEach(card => emailListParentNode.appendChild(card));
      document.querySelector("#emails h2").textContent = `Email projects (${filteredEmails.length})`;
    });
  }

  // Dynamic rendering
  const observer = new MutationObserver(() => {
    if (document.querySelectorAll(".email-card").length) {
      observer.disconnect(); // Stops observing when email cards are found
      initializeEmailCards();
    }
  });

  // Observes document body for dynamic changes
  observer.observe(document.body, { childList: true, subtree: true });
});
