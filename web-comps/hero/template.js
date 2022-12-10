const template = document.createElement('template');
template.innerHTML = `

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

export default template;