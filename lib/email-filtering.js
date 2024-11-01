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
    emailCategories.push(category.textContent);
  });
  // no more duplicated cats
  let emailCategories = [...(new Set(repeatedEmailCategories))];

  let categoryTypesSelect = document.querySelector("#category-types");
  console.log(categoryTypesSelect);
  emailCategories.forEach(category => {
    categoryTypesSelect.append(createCategoryOption(category));
  });

  function createCategoryOption(value) {
    let option = document.createElement("option");
    option.value = value;
    option.textContent = capitalizeIndexChar(value);
    return option;
  }

  // charAt only for utf 16 units so limited, but viable entry
  function capitalizeIndexChar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
})


