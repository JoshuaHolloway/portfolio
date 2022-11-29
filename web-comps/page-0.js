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
        #blob-container {
          /* background: red; */
          width: 200px;
          height: 200px;
        }
      </style>
      <section id="about">
      
        <div id="blob-container">
          <svg
            class="blob-motion"
            id="visual"
            viewBox="0 0 200 200"
            width="200"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
          >
            <g transform="translate(110.57557560413369 110.73880689340612)">
              <path 
                id="blob1" 
                d="M55.5 -62.3C63.8 -47.1 56.9 -23.6 56.1 -0.8C55.3 21.9 60.5 43.8 52.2 53.5C43.8 63.2 21.9 60.6 2.4 58.2C-17.2 55.9 -34.4 53.7 -50.2 44.1C-66.1 34.4 -80.5 17.2 -80.7 -0.1C-80.8 -17.4 -66.6 -34.9 -50.7 -50.1C-34.9 -65.2 -17.4 -78.1 3.1 -81.2C23.6 -84.2 47.1 -77.5 55.5 -62.3"
                fill="#90EE90">        
              </path>
            </g>

            <g transform="translate(109.17206950016399 106.5107481595448)" style="visibility: hidden"><path id="blob2" d="M53 -62C64 -53.9 65 -32.8 61.7 -16.1C58.4 0.6 50.9 12.8 42.9 23C34.9 33.3 26.5 41.5 15.8 47.1C5 52.6 -8.1 55.4 -23.4 54.2C-38.7 53 -56.1 47.8 -67.2 35.5C-78.3 23.2 -83 3.9 -81.4 -16C-79.9 -35.8 -72.1 -56.2 -57.5 -63.6C-42.9 -71.1 -21.4 -65.5 -0.2 -65.3C21 -65 42 -70 53 -62" fill="#90EE90"></path></g>

          </svg>








        </div>

        <div>
          0. Curve
          2. React into Jade
          3. FAQ into Jade
          4. FAQ into demos in portfolio
          5. FLIP
        </div>

        <h3 class="animate-text">Website coming soon to a browser near you...</h3>

      
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