function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// needs to wait for emails to load
sleep(350).then(() => {
  let emailList = Array.from(document.querySelectorAll(".email-card"));
  let allEmailCategorySpans = Array.from(document.querySelectorAll(".email-category span"));
  let headingTwo = document.querySelector("#emails h2");
  console.log(headingTwo.textContent);

  // filled with repeated cats
  let repeatedEmailCategories = [];
  allEmailCategorySpans.forEach(category => {
    repeatedEmailCategories.push(category.textContent);
  });

  // no more duplicated cats
  let emailCategories = [...(new Set(repeatedEmailCategories))];
  let categoryTypesSelect = document.querySelector("#category-types");
  emailCategories.forEach(category => {
    categoryTypesSelect.append(createCategoryOption(category));
  });

  // listener on selection
  categoryTypesSelect.addEventListener("change", filterUserRequest);

  function filterUserRequest(e) {
    let optionSelectedValue = e.target.value;
    let filteredEmails = returnFilteredCategories(emailList, optionSelectedValue);
    let emailListParentNode = document.querySelector("#email-list");
    removeNodesFromParentNode(emailListParentNode);

    if (optionSelectedValue === "all") {
      let totalProjectsNumber = emailList.length;
      headingTwo.textContent = `Email projects (${totalProjectsNumber})`;
      emailList.forEach(emailCard => {
        emailListParentNode.append(emailCard);
      });
    } else {
      let totalFilteredProjectsNumber = filteredEmails.length;
      headingTwo.textContent =`Email projects (${totalFilteredProjectsNumber})`;
      filteredEmails.forEach(emailCard => {
        emailListParentNode.append(emailCard);
      });
    }
  }

  function removeNodesFromParentNode(parentNode) {
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.lastChild);
    }
  }

  function returnFilteredCategories(emails, optionValue) {
    return emails.filter((email) => email.children[0].children[1].innerText == `${optionValue}`);
  }

  function createCategoryOption(value) {
    let option = document.createElement("option");
    option.className = "category-option";
    option.value = value;
    option.textContent = capitalizeIndexChar(value);
    return option;
  }

  // charAt only for utf 16 units so limited, but viable entry
  function capitalizeIndexChar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
})
