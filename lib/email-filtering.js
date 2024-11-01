function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// needs to wait for emails to load
sleep(350).then(() => {
  let emailList = Array.from(document.querySelectorAll(".email-card"));
  let allEmailCategorySpans = Array.from(document.querySelectorAll(".email-category span"));

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

  // listeners to each category starts;
  let allCategoryOptions = Array.from(document.querySelectorAll(".category-option"));  
  console.log(allCategoryOptions);
  console.log(emailList[0].children[0].children[1].innerText);
  allCategoryOptions.forEach(option => {
    option.addEventListener("click", (e)=> {
      let optionValue = e.target.value;
      console.log(optionValue);
      returnFilteredCategories(emailList, optionValue);
    });
  });

  // needs to append to dom, returns nodes
  function returnFilteredCategories(emails, optionValue) {
    console.log(emails.filter((email) => email.children[0].children[1].innerText == `${optionValue}`));
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
