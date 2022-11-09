const template = document.createElement('template');
template.innerHTML = `
  <style>
    * {
      color: green;
    }
  </style>

  <main>
    <h1>Web Comp - Page 0</h1>
  </main>
`;

class WebComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const elem = this.shadowRoot.querySelector('page');
  }

  disconnectedCallback() {
    const elem = this.shadowRoot.querySelector('page')
  }
}

window.customElements.define('page-0', WebComp);