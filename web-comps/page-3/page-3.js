import html from "./template.js";
import importCSS from "../util/import-css.js";
import setupHTML from "../util/setup-html.js";
const css = '/web-comps/page-3/index.css';

// ==============================================

class WebComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'})
    const shadowRoot = this.shadowRoot;
    importCSS(shadowRoot, css);
    setupHTML(shadowRoot, html);
  }
  
  // --------------------------------------------
  
  connectedCallback() {
    const elem = this.shadowRoot.querySelector('main');
  }

  disconnectedCallback() {
    const elem = this.shadowRoot.querySelector('main')
  }
}

window.customElements.define('page-3', WebComp);