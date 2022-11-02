import css from './css.js';
import { listenForEvent, fireEvent } from '../functions/custom-events.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    input[type=checkbox]{
      height: 0;
      width: 0;
      visibility: hidden;
    }

    label {
      --label-height: 25px;
      --top: 3px;
      --height: calc(var(--label-height) - 2 * var(--top));
      --width: 65px;

      cursor: pointer;
      text-indent: -9999px;
      width: var(--width);
      height: var(--label-height);
      background: grey;
      display: block;
      border-radius: 100px;
      position: relative;
    }

    label:after {
      content: '';
      position: absolute;
      top: var(--top);
      left: var(--top);
      width: var(--height); /* height of label - 2 * top */
      height: var(--height); /* 90px; */
      background: #fff;
      border-radius: 90px;
      transition: 0.3s;
    }

    input:checked + label {
      background: #bada55;
    }

    input:checked + label:after {
      left: calc(100% - 5px);
      transform: translateX(-100%);
    }

    label:active:after {
      width: calc(var(--width) - 2 * var(--top));
    }

    .container {
    }
  </style>

  <div class="container">
    <input type="checkbox" id="switch" />
    <label for="switch">Toggle</label>
  </div>

`;

class ToggleSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true));



  }

  connectedCallback() {
    const elem = this.shadowRoot.querySelector('#switch');

    // setTimeout(function() {
    //   console.log(elem.checked);
    //   elem.click();
    //   console.log(elem.checked);
    // }, 2e3);


    // Flip switch when user scrolls to middle of page:
    // -Step 1: Fire event in smooth-scroll.js
    // -Step 2: In the toggle-button web-component listen for the event and respond to it firing.
    // -Step 3: In the callback select the toggle-switch. 
    listenForEvent('scrolled-to-middle-of-page', () => {
      console.log('user scrolled to middle of page!');
      elem.click();
    });
    
    // -Element in regular DOM we want to change
    //  in response to event fired from web-comp:
    // const light_elem = document.querySelector('#light-DOM-elem');

    let is_dark_mode = true;
    elem.addEventListener('change', () => {

      if (is_dark_mode) {
        css.set('bg-primary', 'lightgray');
        css.set('clr-primary', 'black');
      } else {
        css.set('bg-primary', 'black');
        css.set('clr-primary', 'lightgray');
      }

      // -Invert state:
      is_dark_mode = !is_dark_mode;
    });
  }

  disconnectedCallback() {
    const elem = this.shadowRoot.querySelector('#switch')
    elem.removeEventListener();
  }
}

window.customElements.define('toggle-switch', ToggleSwitch);

const toggle_switch_web_comp = document.querySelector('toggle-switch');
console.log('Toggle Switch Web Component:\n', toggle_switch_web_comp);