function TotalEmailsCard(number, text){
  const div = document.createElement("div");
  div.id = "total-emails";
  div.style.borderRadius = "12px";
  div.style.padding = "2em";

  const headingText = document.createElement("h2");
  headingText.textContent += text;
  let numberCount = document.createElement("p");
  numberCount.textContent += number;
  div.append(headingText, numberCount);
  return div;
}

export { TotalEmailsCard };
