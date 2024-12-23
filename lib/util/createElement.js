function createElement(tag, { className, textContent, children, ...attributes } = {}) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  if (children) children.forEach(child => el.appendChild(child));
  Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

export default createElement;
