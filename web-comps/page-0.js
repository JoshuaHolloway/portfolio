const template = document.createElement('template');
template.innerHTML = `
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    span {
      overflow: hidden;
      display: block;
    }
    .loader-wrap {
      position: absolute;
      z-index: 10;
      height: 100vh;
      width: 100%;
      display: flex;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      background: transparent;
      top: 0;
      left: 0;
    }
    .loader-wrap svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 110vh;
    }


    @media (max-width: 767px) {
      .loader-wrap svg {
        width: 200vw;
        margin-left: -50vw;
      }
      .loader-wrap .loader-wrap-heading,
      .container h1 {
        font-size: 60px;
      }
    }
  </style>

  <main>
    <div class="loader-wrap">
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path id="svg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
      </svg>
    </div>
    <div class="container">
      
      <wc-hero></wc-hero>

      <style>
        section {
          height: 100vh;
        }
      </style>
      <section id="about">
        <div class="animate-box" style="height: 100px; width: 100px; background: red;"></div>
        <h3 class="animate-text">Text goes here...</h3>
      </section>

    </div>
  </main>
`;

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
      
      tl.from(qs('.animate-box'), {
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
    
  }

  // --------------------------------------------
  
  disconnectedCallback() {
    const elem = this.shadowRoot.querySelector('page')
  }
}

// ==============================================

window.customElements.define('page-0', WebComp);