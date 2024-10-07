import { fetchData } from './lib/fetch-data.js';
import { updateEmail } from './lib/update-email.js';

const host = location.href;
let emailTypeCategories = {};
export async function rendersEmailPage() {
  const data = await fetchData(`${host}api/emails`);
  emailTypeCategories = await fetchData(`${host}api/email-types`);
  renderEmails(data);

}

function renderEmails(data) {
  let allEmails = document.querySelector('#all-emails');
  allEmails.innerHTML = '';
  data.forEach((email, index) => {
    allEmails.append(EmailCard(email.title, email.category, email.emailType, email.description, email.imageFileName, index));
  });
}

function EmailCard(title, category, emailType, description, image, index) {
  let div = document.createElement('div');
  div.setAttribute('data-index', index);
  div.className = 'email-card';
  let emailTitle = document.createElement('h2');
  emailTitle.textContent += title;
  let categoryP = document.createElement('p');
  categoryP.textContent = `Category: ${category}`;
  let emailTypeP = document.createElement('p');
  emailTypeP.textContent = `Email type: ${emailType}`;
  let emailDescription = document.createElement('p');
  emailDescription.textContent = description;
  let emailThumbnail = document.createElement('img');
  emailThumbnail.setAttribute('src', `http://127.0.0.1:8080/assets/${image}`);
  emailThumbnail.setAttribute('width', '100px');

  let editButton = document.createElement('button');
  editButton.textContent += 'Edit';

  editButton.addEventListener('click', () => {
    editEmail(index, title, category, emailType, description, image);
  });

  div.append(emailTitle, categoryP, emailTypeP, emailDescription, emailThumbnail, editButton);
  return div;
}

function editEmail(index, title, category, emailType, description, image) {
  const emailCard = document.querySelector(`.email-card[data-index='${index}']`);
  emailCard.innerHTML = '';

  let form = document.createElement('form');
  form.setAttribute('data-index', index);

  let inputTitle = document.createElement('input');
  inputTitle.value = title;

  let typesSelectionDiv = document.createElement('div');

  let labelForCategoryType = document.createElement('label');
  labelForCategoryType.htmlFor = 'email-category';
  labelForCategoryType.textContent = 'Select category:';
  let selectCategory = document.createElement('select');
  selectCategory.name = 'email-type';

  Object.keys(emailTypeCategories).forEach(cat => {
    let option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    if (cat === category) {
      option.selected = true;
    }
    selectCategory.append(option);
  });

  let labelForEmailType = document.createElement('label');
  labelForEmailType.htmlFor = 'email-type';
  labelForEmailType.textContent = 'Select email type:';
  let selectEmailType = document.createElement('select');
  selectEmailType.name = 'email-type';
  selectEmailType.disabled = false;

  selectCategory.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;
    selectEmailType.innerHTML = '';
    emailTypeCategories[selectedCategory].forEach(type => {
      let option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      if (type === emailType) {
        option.selected = true;
      }
      selectEmailType.append(option);
    });
  });

  selectCategory.dispatchEvent(new Event('change'));
  typesSelectionDiv.append(labelForCategoryType,selectCategory, labelForEmailType,selectEmailType);

  let labelForDescription = document.createElement('label');
  labelForDescription.htmlFor = 'email-description';
  labelForDescription.textContent = 'Enter description';
  let inputDescription = document.createElement('textarea');
  inputDescription.value = description;
  inputDescription.name = 'email-description';
  let inputDescriptionDiv = document.createElement('div');
  inputDescriptionDiv.append(labelForDescription, inputDescription);


  let imageInput = document.createElement('input');
  imageInput.value = image;

  let cancelEditButton = document.createElement('button');
  cancelEditButton.textContent = 'Cancel';
  cancelEditButton.addEventListener('click', (e) => {
    e.preventDefault();
    renderEmailCard(emailCard, title,  category, emailType, description, image, index);
  });

  let submitButton = document.createElement('button');
  submitButton.textContent = 'Save';
  submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const emailData = {
      title: inputTitle.value,
      category: selectCategory.value,
      emailType: selectEmailType.value,
      description: inputDescription.value,
      imageFileName: imageInput.value
    };

    await handleEmailPUTSubmit(emailData, index);
  });

  form.append(inputTitle, typesSelectionDiv, inputDescriptionDiv, imageInput, cancelEditButton, submitButton);
  emailCard.append(form);
}

function renderEmailCard(card, title, category, emailType, description, image, index) {
  card.innerHTML = '';
  let emailTitle = document.createElement('h2');
  emailTitle.textContent += title;
  let categoryP = document.createElement('p');
  categoryP.textContent = `Category: ${category}`;
  let emailTypeP = document.createElement('p');
  emailTypeP.textContent = `Email type: ${emailType}`;
  let emailDescription = document.createElement('p');
  emailDescription.textContent = description;
  let emailThumbnail = document.createElement('img');
  emailThumbnail.setAttribute('src', `http://127.0.0.1:8080/assets/${image}`);
  emailThumbnail.setAttribute('width', '100px');

  let editButton = document.createElement('button');
  editButton.textContent += 'Edit';

  editButton.addEventListener('click', () => {
    editEmail(index, title, category, emailType, description, image);
  });
  card.append(emailTitle, categoryP, emailTypeP, emailDescription, emailThumbnail, editButton);
}

async function handleEmailPUTSubmit(emailData, index) {
  const typeIndex = emailTypeCategories[emailData.category].indexOf(emailData.emailType);

  const updatedEmail = {
    title: emailData.title,
    category: emailData.category,
    typeIndex: typeIndex,
    emailType: emailData.emailType,
    description: emailData.description,
    imageFileName: emailData.imageFileName
  };
  
  try {
    const updatedData = await updateEmail(index, updatedEmail.title, updatedEmail.category, updatedEmail.typeIndex, updatedEmail.emailType, updatedEmail.description, updatedEmail.imageFileName);
    renderEmails(updatedData);
  } catch (err) {
    console.error('Failed to update email: ', err);
  }

}




