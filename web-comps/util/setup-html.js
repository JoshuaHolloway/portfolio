const setupHTML = (shadowRoot, template) => {
  shadowRoot.appendChild(template.content.cloneNode(true));
};   

export default setupHTML;