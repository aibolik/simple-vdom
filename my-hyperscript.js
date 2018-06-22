export default function hyperscript(nodeName, attrs, ...children) {

  const $el = document.createElement(nodeName);

  for (let key in attrs) {
    $el.setAttribute(key, attrs[key]);
  }

  children.forEach(child => {
    if (typeof child === 'string') {
      $el.appendChild(document.createTextNode(child));
    } else {
      $el.appendChild(child);
    }
  });

  return $el;
}