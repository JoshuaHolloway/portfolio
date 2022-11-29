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
      width: 100vw;
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
        section#about {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
      </style>
      <section id="about">
      
        <div id="blog-container">
          <svg
            class="blob-motion"
            viewBox="0 0 300 300"
            width="300"
            height="300"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
          >
          <g transform="translate(148.00954411357816 143.3754709399765)"><path id="blob1" d="M84.5 -92.7C104.7 -83.7 112.9 -52.5 112.3 -24.5C111.6 3.6 102.2 28.5 89.5 52.8C76.8 77 61 100.5 40 107C18.9 113.4 -7.3 102.7 -30.1 90.9C-52.9 79.1 -72.4 66 -87.1 47.1C-101.9 28.2 -112 3.3 -107.1 -17.9C-102.2 -39.1 -82.3 -56.7 -61.9 -65.6C-41.6 -74.5 -20.8 -74.8 5.7 -81.5C32.1 -88.3 64.3 -101.6 84.5 -92.7" fill="#90EE90"></path></g>

          <g transform="translate(158.38919272288618 129.16969115480245)" style="visibility: hidden;"><path id="blob2"d="M48.1 -57.3C64 -43.9 79.8 -30.4 84.3 -13.6C88.8 3.3 82.1 23.4 73.3 45.9C64.6 68.5 53.8 93.4 32.7 109.7C11.6 125.9 -19.8 133.4 -41.3 122C-62.8 110.5 -74.3 80 -85.1 53.1C-95.9 26.2 -106.1 2.8 -101.3 -16.8C-96.5 -36.4 -76.9 -52.3 -57.5 -65C-38.1 -77.8 -19.1 -87.4 -1.5 -85.6C16.1 -83.8 32.1 -70.6 48.1 -57.3" fill="#90EE90"></path></g>

          </svg>
        </div>

        <h3 class="animate-text">Coming soon to a browser near you...</h3>

      
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