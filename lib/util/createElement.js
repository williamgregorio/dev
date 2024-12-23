function createElement(tag, { className, textContent, children, dataset, ...attributes } = {}) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  if (children) children.forEach(child => el.appendChild(child));
  if (dataset) {
    Object.entries(dataset).forEach(([key,value]) => {
      el.dataset[key] = value;
    });
  }
  Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

export default createElement;
