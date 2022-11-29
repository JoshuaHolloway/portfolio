const template = document.createElement('template');
template.innerHTML = `
  <style>

    * { 
      box-sizing: border-box;
      color: white;
    }

    .container { position: relative;
      height: 100vh;
      width: 100vw;
      display: grid;
    }
    @media (max-width: 1000px) {
      .container > .left {
        display: none;
      }
      .container {
        /* grid-template-columns: 1fr; */
      }
      .super-title { font-size: 18px; }
      .title { font-size: 60px; }
      .sub-title { font-size: 16px; }
    }
    @media (min-width: 1000px) {
      .container { grid-template-columns: 1fr 1fr; }
      .super-title { font-size: 26px; }
      .title { font-size: 85px; }
      .sub-title { font-size: 20px; }
    }

    .overlay { position: absolute; z-index: 0;
      height: 100vh;
      width: 100vw;
      /* background: rgba(0, 0, 0, 0.7); */
    }

    .left, 
    .right { position: relative; z-index: 1;
      display: flex;
      /* justify-content: center; */
      align-items: center;

      /* border: dashed lightblue 5px; */
      height: 100vh;

      --pad: min(15%, 150px);
    }
    .left {
      justify-content: flex-end;
      padding-right: var(--pad);
      /* border: solid 5px orange; */
    }
    @media (max-width: 1000px) {
      .right { justify-content: center; }
      .right__container { width: 300px; }
    }
    @media (min-width: 1000px) {
      .right {
        justify-content: flex-start;
        padding-left: var(--pad);
      }
      .right__container { width: 400px; }
    }

    .left > .left-container {
    }
    .left > .left-container > svg {
      width: 400px;
      position: relative;
    }
    .super-title {
      line-height: 1;
      text-decoration: underline;
      margin: 0;
      margin-bottom: 1rem;
    }
    .title {
      font-weight: 700;
      line-height: 1;
      margin: 0;
      margin-bottom: 0.9rem;
    }
    .sub-title {
      line-height: 1;
      margin: 0;
      margin-bottom: 1.5rem;
    }
  </style>

  <div class="container" style="background-image: url('img/AdobeStock_504342231_1920x1280.webp');">

    <div class="overlay"></div>

    <style>
      #construction {
        width: 100vw;
        position: absolute;
        bottom: 10%;
        text-align: center;
      }
    </style>
    <div id="construction">🚧 Website under construction! 🚧</div>
    
    <div class="left">
      <!-- <img src="./img/logo-crop.jpg" alt=""> -->

      <div class="left-container">

        <svg xmlns="http://www.w3.org/2000/svg" class="hero-design" width="686" height="688" viewBox="0 0 686 688">
          <g id="blockdesign" transform="translate(-935 -289)">
            <rect id="top-square"class="square-anim" data-name="Rectangle 2" width="172" height="172" rx="19" transform="translate(1277 289)" fill="rgba(255, 255, 255, 0.5)"/>
            <rect id=top-circle" class="square-anim" data-name="Rectangle 10" width="172" height="172" rx="86" transform="translate(1277 461)" fill="deepskyblue"/>
            <rect class="square-anim" data-name="Rectangle 8" width="172" height="172" rx="19" transform="translate(1449 461)" fill="rgba(255, 255, 255, 0.5)"/>
            <rect id="row-3-right-square" class="square-anim" data-name="Rectangle 5" width="172" height="172" rx="19" transform="translate(1277 633)" fill="rgba(255, 255, 255, 0.5)" />
            <rect id="row-2-left-square" class="square-anim" data-name="Rectangle 3" width="172" height="172" rx="19" transform="translate(1107 461)" fill="rgba(255, 255, 255, 0.8)" />
            <rect id="lower-circle" class="square-anim" data-name="Rectangle 9" width="172" height="172" rx="86" transform="translate(1107 633)" fill="lightgreen"/>
            <rect id="row-3-left-square" class="square-anim" data-name="Rectangle 7" width="172" height="172" rx="19" transform="translate(935 633)" fill="#fff" opacity="0.17"/>
            <rect id="row-4-square" class="square-anim" data-name="Rectangle 4" width="172" height="172" rx="19" transform="translate(1107 805)" fill="rgba(255, 255, 255, 0.8)" />
          </g>
        </svg>
      </div>

    </div>
    
    <div class="right">
      <div class="right__container">
        <div class="super-title stagger1">
          Full Stack Web Developer
        </div>
        <div class="title stagger1">
          Josh Holloway
        </div>
        <div class="sub-title stagger1">
          JavaScript | React | PHP | Node
        </div>

        <div class="button-group stagger1">
          <wc-button-link variant="outline" href="/coming-soon">
            PROJECTS
          </wc-button-link>
          <wc-button-link variant="full" href="/coming-soon" style="margin-left: 30px;">
            CONTACT
          </wc-button-link>
        </div>
      </div>

    </div>

    <div style="position: absolute; width: 100vw; bottom: 0; transform: rotate(180deg);">
      <!-- Wavy SVG Divider -->
      <div class="custom-shape-divider-top-1667484223" style="background: transparent;">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
          </svg>
      </div>
    </div>

  </div>


`;

class WebComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true));
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