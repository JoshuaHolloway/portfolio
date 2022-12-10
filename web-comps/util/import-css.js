const importCSS = (shadowRoot, path) => {
  // Apply external styles to the shadow DOM
  const linkElem = document.createElement("link");
  linkElem.setAttribute("rel", "stylesheet");
  linkElem.setAttribute("href", path);
  shadowRoot.appendChild(linkElem);
};;

export default importCSS;