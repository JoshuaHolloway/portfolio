import template from "./template.js";

// ==============================================

class WebComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  
  // --------------------------------------------
  
  connectedCallback() {
    
    const qs = x => this.shadowRoot.querySelector(x);
    const qsAll = x => this.shadowRoot.querySelectorAll(x);
    
    // - - - - - - - - - - - - - - - - - - - - - 
    
    const curtainAnim = () => {
      const svg = qs("#svg");
      const tl = gsap.timeline();
      const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
      const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
      tl.to(svg, {
        duration: 0.8,
        attr: { d: curve },
        ease: "power2.easeIn",
        delay: 1
      }).to(svg, {
        duration: 0.8,
        attr: { d: flat },
        ease: "power2.easeOut",
      });
    };
    curtainAnim();
    
    // - - - - - - - - - - - - - - - - - - - - - 
    
    const sectionAnimation = () => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: qs('#about'),
          start: 'center bottom',
          // start: 'top bottom',
          // toggleActions: "play pause resume reset"
          toggleActions: "play pause resume reverse"
        }
      });
      
      tl.from(qs('.blob-motion'), {
        x: 200,
        opacity: 0,
        duration: 1.1
      });
      
      tl.from(qs('.animate-text'), {
        y: 200,
        opacity: 0,
        duration: 1
      }, '-=1');

    };
    sectionAnimation();
    
    // - - - - - - - - - - - - - - - - - - - - - 
    
    const blobAnim = () => {
      const tween = KUTE.fromTo(
        qs('#blob1'),
        { path: qs('#blob1') },
        { path: qs('#blob2') },
        { repeat: 999, duration: 3000, yoyo: true }
        ).start();
      };
      blobAnim();
      
      // - - - - - - - - - - - - - - - - - - - - - 

  }

  // --------------------------------------------
  
  disconnectedCallback() {
    const elem = this.shadowRoot.querySelector('page')
  }
}

// ==============================================

window.customElements.define('page-0', WebComp);