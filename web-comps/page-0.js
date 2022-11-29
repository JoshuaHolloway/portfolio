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
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
      </style>
      <section id="about">
      
        <svg
          class="blob-motion"
          id="visual"
          viewBox="0 0 960 540"
          width="300"
          height="300"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
        >
          <g transform="translate(450.7256843113689 283.4942824330989)">
            <path
              id="blob1"
              d="M148.7 -134.9C193.7 -103.7 231.9 -51.9 232.4 0.6C233 53 196.1 106.1 151.1 128.6C106.1 151.1 53 143 -4.4 147.4C-61.8 151.8 -123.5 168.5 -151.2 146C-178.8 123.5 -172.4 61.8 -172.8 -0.4C-173.1 -62.5 -180.3 -124.9 -152.6 -156.1C-124.9 -187.3 -62.5 -187.1 -5.3 -181.8C51.9 -176.5 103.7 -166 148.7 -134.9"
              fill="lightgreen"
            ></path>
          </g>
          <g transform="translate(509.54377535978017 281.49390864595887)" style="visibility: hidden">
            <path
              id="blob2"
              d="M115.4 -137.9C137.9 -92.9 136.4 -46.4 133.6 -2.8C130.8 40.8 126.6 81.6 104.1 118.4C81.6 155.2 40.8 188.1 -8.4 196.5C-57.5 204.8 -115 188.7 -151 151.9C-187 115 -201.5 57.5 -190.8 10.7C-180.1 -36.1 -144.1 -72.1 -108.1 -117.1C-72.1 -162.1 -36.1 -216.1 5.2 -221.2C46.4 -226.4 92.9 -182.9 115.4 -137.9"
              fill="lightgreen"
            ></path>
          </g>
        </svg>

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