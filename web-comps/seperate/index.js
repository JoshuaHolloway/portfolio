import template from "./template.js";
import importCSS from "../util/import-css.js";
import setupHTML from "../util/setup-html.js";
const css = '/web-comps/seperate/index.css';

class WebComp extends HTMLElement {

  #listeners = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open'})
    const shadowRoot = this.shadowRoot;
    importCSS(shadowRoot, css);
    setupHTML(shadowRoot, template);
  }

  connectedCallback() {
    // const elem = this.shadowRoot.querySelector('#web-comp'); // same as this???

    // Attributes -> CSS:
    const updateStyle = () => {
      const style = document.createElement('style');
      style.textContent = `
        #web-comp {
          width: ${this.getAttribute("l")}px;
          height: ${this.getAttribute("l")}px;
          background-color: ${this.getAttribute("c")};
        }
      `;
      this.shadowRoot.appendChild(style);
    }
    updateStyle();

    // Event listeners on buttons => Fire custom events:
    const btn_1 = this.shadowRoot.querySelector('#btn-1');
    const btn_2 = this.shadowRoot.querySelector('#btn-2');
    const btn_delete = this.shadowRoot.querySelector('#btn-delete');

    const handler1 = this.fireEvent1.bind(this);
    const handler2 = this.fireEvent2.bind(this);

    btn_1.addEventListener('click', handler1);
    btn_2.addEventListener('click', handler2);
    btn_delete.addEventListener('click', () => this.remove());

    this.#listeners.push({ object: btn_1, event: 'click', handler:  handler1})
    this.#listeners.push({ object: btn_2, event: 'click', handler:  handler2})
  }
  
  fireEvent1 () { this.dispatchEvent(new CustomEvent('event-1', { detail: { name: 'josh-1'} })) }
  fireEvent2 () { this.dispatchEvent(new CustomEvent('event-2', { detail: { name: 'josh-2'} })) }

  disconnectedCallback() {
    // const elem = this.shadowRoot.querySelector('#web-comp');

    alert('removing web-comp from DOM!');

    this.#listeners.forEach( ({object, event, handler}) => object.removeEventListener( event, handler  ) );
  }
}

window.customElements.define('wc-seperate', WebComp);