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
    
    // -Element in regular DOM we want to change
    //  in response to event fired from web-comp:
    const light_elem = document.querySelector('#light-DOM-elem');

    let is_dark_mode = true;
    elem.addEventListener('change', () => {
      
      if (is_dark_mode) {
        light_elem.textContent = 'Light Mode';
        light_elem.style.backgroundColor = 'white';
        light_elem.style.color = 'black';
      } else {
        light_elem.textContent = 'Dark Mode';
        light_elem.style.backgroundColor = 'black';
        light_elem.style.color = 'white';
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