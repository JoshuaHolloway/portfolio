const template = document.createElement('template');
template.innerHTML = `
  <style>
    * {
      color: green;
    }
  </style>

  <div id="page-0">
    <h1>Web Comp - Page 0</h1>
  </div>
`;

class WebComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const elem = this.shadowRoot.querySelector('#page-0');
  }

  disconnectedCallback() {
    const elem = this.shadowRoot.querySelector('#page-0')
  }
}

window.customElements.define('page-0', WebComp);