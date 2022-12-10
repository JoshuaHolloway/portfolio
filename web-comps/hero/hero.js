import html from "./template.js";
import importCSS from "../util/import-css.js";
import setupHTML from "../util/setup-html.js";
const css = '/web-comps/hero/index.css';

class WebComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'})
    const shadowRoot = this.shadowRoot;
    importCSS(shadowRoot, css);
    setupHTML(shadowRoot, html);
  }

  connectedCallback() {

    const qs = x => this.shadowRoot.querySelector(x);
    const qsAll = x => this.shadowRoot.querySelectorAll(x);

    const elem = qs('#web-comp');

    const construction = qs('#construction');
    construction.animate([
        { transform: 'scale(1)'},
        { transform: 'scale(1.033)' }
      ], {
        duration: 1e3,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
      }
    ); 
    // keyframes array
    // effect timing object

      // - - - - - - Loading Animation - - - - - - - - - 

      gsap.registerPlugin(ScrollTrigger);
      const tl = gsap.timeline();

      tl.to(qs('.overlay'), { 
        background: 'rgba(0, 0, 0, 0.7)', 
        delay: 1.5,
        duration: 1.5
      });

      tl.from(qsAll('.stagger1'), {
          opacity: 0,
          y: -50,
          stagger: .3,
          ease: Power4.easeOut,
          duration: 2,
      }, '<=');

      tl.from(qs('.hero-design'), {
          opacity: 0, y: 50, ease: Power4.easeOut, duration: 1
      }, '-=1.5');

      tl.from(qs(".square-anim"), {
          stagger: .2,
          scale: 0.1,
          duration: 1,
          ease: Back.easeOut.config(1.7)
      }, "<=");


  }

  disconnectedCallback() {
    const elem = this.shadowRoot.querySelector('#web-comp')
  }
}

window.customElements.define('wc-hero', WebComp);