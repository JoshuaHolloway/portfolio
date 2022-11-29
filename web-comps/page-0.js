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
    .loader-wrap .loader-wrap-heading h1 {
      font-size: 120px;
      z-index: 20;
      color: #e0e0e0;
      text-transform: uppercase;
      font-weight: lighter;
      font-family: "Ogg";
    }
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100%;
    }
    .container h1 {
      font-family: "Ogg";
      font-weight: lighter;
      font-size: 100px;
      text-transform: uppercase;
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

      <!-- <div class="loader-wrap-heading">
        <span><h1>Loading</h1></span>
      </div> -->
    </div>
    <div class="container">
      
      <wc-hero></wc-hero>

    </div>
  </main>
`;

class WebComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {

    const svg = this.shadowRoot.getElementById("svg");
    const tl = gsap.timeline();
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    // tl.from(".loader-wrap-heading h1", {
    //   delay: 1,
    //   y: 200,
    //   skewY: 10,
    // }).to(".loader-wrap-heading h1", {
    //   delay: 1.5,
    //   y: -200,
    //   skewY: 10,
    // });
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
    tl.to(".loader-wrap", {
      y: -1500,
    });
    tl.to(".loader-wrap", {
      zIndex: -1,
      display: "none",
    });
    tl.from(
      ".container h1",
      {
        y: 100,
        opacity: 0,
      },
      "-=1.5"
    );

  }

  disconnectedCallback() {
    const elem = this.shadowRoot.querySelector('page')
  }
}

window.customElements.define('page-0', WebComp);