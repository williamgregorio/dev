import { fetchData } from './lib/fetch-data.js';
import { updateEmail } from './lib/update-email.js';

const host = location.href;
fetchData(`${host}api/emails`).then(data => {
  renderEmails(data);
}).catch(err => {
  console.error(err);
});

function renderEmails(data) {
  let allEmails = document.querySelector('#all-emails');
  allEmails.innerHTML = '';
  data.forEach((email, index) => {
    allEmails.append(EmailCard(email.title, email.type, email.description, email.imageFileName, index));
  });
}

function EmailCard(title, type, description, image, index) {
  let div = document.createElement('div');
  div.setAttribute('data-index', index);
  div.className = 'email-card';
  let emailTitle = document.createElement('h2');
  emailTitle.textContent += title;
  let emailType = document.createElement('p');
  emailType.textContent += type;
  let emailDescription = document.createElement('p');
  emailDescription.textContent = description;
  let emailThumbnail = document.createElement('img');
  emailThumbnail.setAttribute('src', `http://127.0.0.1:8080/assets/${image}`);
  emailThumbnail.setAttribute('width', '100px');

  let editButton = document.createElement('button');
  editButton.textContent += 'Edit';

  editButton.addEventListener('click', () => {
    editEmail(index, title, type, description, image);
  });

  div.append(emailTitle, emailType, emailDescription, emailThumbnail, editButton);
  return div;
}

function editEmail(index, title, type, description, image) {
  const emailCard = document.querySelector(`.email-card[data-index='${index}']`);
  emailCard.innerHTML = '';

  let form = document.createElement('form');

  form.setAttribute('data-index', index);

  let inputTitle = document.createElement('input');
  inputTitle.value = title;

  let labelForInputType = document.createElement('label');
  labelForInputType.htmlFor = 'email-type';
  labelForInputType.textContent = 'Enter type:';
  let inputType = document.createElement('input');
  inputType.value = type;
  inputType.name = 'email-type';
  let inputTypeDiv = document.createElement('div');
  inputTypeDiv.append(labelForInputType, inputType);

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
    renderEmailCard(emailCard, index, type, description, image);
  });

  let submitButton = document.createElement('button');
  submitButton.textContent = 'Save';
  submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const updatedData = await updateEmail(index, inputTitle.value, inputType.value, inputDescription.value, imageInput.value);
      renderEmails(updatedData);
    } catch (error) {
      console.error('Error updating email: ', error);
    }
  });

  form.append(inputTitle, inputTypeDiv, inputDescriptionDiv, imageInput, cancelEditButton, submitButton);
  emailCard.append(form);
}

function renderEmailCard(card, title, index, type, description, image) {
  card.innerHTML = '';
  let emailTitle = document.createElement('h2');
  emailTitle.textContent += title;
  let emailType = document.createElement('p');
  emailType.textContent += type;
  let emailDescription = document.createElement('p');
  emailDescription.textContent = description;
  let emailThumbnail = document.createElement('img');
  emailThumbnail.setAttribute('src', `http://127.0.0.1:8080/assets/${image}`);
  emailThumbnail.setAttribute('width', '100px');

  let editButton = document.createElement('button');
  editButton.textContent += 'Edit';

  editButton.addEventListener('click', () => {
    editEmail(index, title, type, description, image);
  });
  card.append(emailTitle, emailType, emailDescription, emailThumbnail, editButton);
}
