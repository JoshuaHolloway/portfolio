const template = document.createElement('template');
template.innerHTML = `
  <style>
    * {
      color: yellow;
    }
  </style>

  <main>
    <h1>Web Comp - Page 3</h1>
  </main>
`;

class WebComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const elem = this.shadowRoot.querySelector('main');
  }

  disconnectedCallback() {
    const elem = this.shadowRoot.querySelector('main')
  }
}

window.customElements.define('page-3', WebComp);