const template = document.createElement('template');
template.innerHTML = `
  <style>
    * {
      color: red;
    }
  </style>

  <div id="web-comp">
    <h1>Web Comp!</h1>
  </div>
`;

class WebComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const elem = this.shadowRoot.querySelector('#web-comp');
  }

  disconnectedCallback() {
    const elem = this.shadowRoot.querySelector('#web-comp')
  }
}

window.customElements.define('web-comp', WebComp);