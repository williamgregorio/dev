import { fetchData } from './lib/fetch-data.js';

const main = document.querySelector("main");
const host = location.href;

fetchData(`${host}api/emails`).then(data => {
  let allEmails = document.querySelector('#all-emails');
  data.forEach((email,index) => {
    console.log(index);
   allEmails.append(EmailCard(email.type, email.description, email.imageFileName, index));
  });

}).catch(err => {
    console.error(err);
  })

function EmailCard(type,description,image,index) {
  let div = document.createElement('div');
  div.setAttribute('data-index', index);
  div.className = 'email-card';
  let emailTitle = document.createElement('h2');
  emailTitle.textContent += 'Title';
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
    console.log('click');
    editEmail(index, type, description, image);
  });

  div.append(emailTitle,emailType,emailDescription, emailThumbnail, editButton);
  return div;
}

function editEmail(index, type, description, image) {
  const emailCard = document.querySelector(`.email-card[data-index='${index}']`);

  emailCard.innerHTML = '';

  let form = document.createElement('form');
  form.setAttribute('data-index', index);
  let labelForInputType = document.createElement('label');
  labelForInputType.htmlFor = 'email-type';
  labelForInputType.textContent = 'Enter type:';
  let inputType = document.createElement('input');
  inputType.value = type;
  inputType.name = 'email-type';
  let inputTypeDiv = document.createElement('div');
  inputTypeDiv.append(labelForInputType, inputType);


  form.append(inputTypeDiv);

  let cancelEditButton = document.createElement('button');
  cancelEditButton.textContent = 'Cancel';
  cancelEditButton.addEventListener('click', (e) => {
    e.preventDefault();
  })
  emailCard.append(form);
}
