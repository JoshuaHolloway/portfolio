import { listenForEvent, fireEvent } from '../js/custom-events.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    #web-comp {
      --pad: 80px;
    }

    @media (max-width: 900px) {
      #navbar .navlinks { display: none; }
      #navdrawer { display: flex; }
      /* #hamburger { display: block; } */
    }
    @media (min-width: 900px) {
      #navdrawer { display: none; }
    }

    #overlay { /* beneath the navdrawer */
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9; /* navdrawer=10, overlay=9, navbar=8 */
      display: none;
      opacity: 0;
      pointer-events: none;
    }

    #navbar {
      height: var(--init-navbar-height); /* Starts here, ends at 80px */
      width: 100vw;
      height: 80px;
      background: rgba(255, 255, 255, 0.1);
      position: fixed;
      z-index: 8; /* navdrawer=10, overlay=9, navbar=8 */
    }

    #navbar > .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    .gutter {
      --padding: 5%;
      padding-left: var(--padding);
      padding-right: var(--padding);
    }

    #navdrawer {
      --width: 200px;
      height: 100vh;
      width: var(--width);
      background: blue;
      position: fixed;
      top: 0;
      transform: translateX( calc(-1 * var(--width) ) );

      display: flex;
      justify-content: center; 
      align-items: center;
      
      z-index: 10; /* navdrawer=10, overlay=9, navbar=8 */
    }

    #navdrawer > .navlinks {
      background: darkorchid;
      display: flex;
      flex-direction: column;
      /* width: fit-content; */
    }
    #navdrawer .navlink:not(:nth-child(1)) {
      margin-top: 30px;
    }

    .logo {
      height: 50px;
      width: 50px;
      /* background: white; */
      background-image: url("/img/favicon.svg"); /* The image used */
      background-position: center; /* Center the image */
      background-repeat: no-repeat; /* Do not repeat the image */
      background-size: cover; /* Resize the background image to cover the entire container */
    }
    .navlinks {
      /* background: orange; */
      cursor: pointer;
    }
    .navlink {
      text-decoration: none;
      color: white;

      transition: color 0.2s ease;
    }
    .navlink:hover, 
    .navlink.active {
      --color: darkorange;
      color: var(--color) !important;
    }
    #navbar .navlink:not(:nth-child(1)) {
      margin-left: 30px;
    }
    #hamburger {
      fill: white;

      --size: 35px;
      height: var(--size);
      width: var(--size);

      cursor: pointer;
    }
    #hamburger svg {
      fill: white;
    }
  </style>

  <div id="web-comp">

    <div id="navdrawer">
      <nav>
        <span class="navlink">page 0</span>
        <span class="navlink">page 1</span>
        <span class="navlink">page 2</span>
        <span class="navlink">page 3</span>
        <span class="navlink">page 4</span>
      </nav>
    </div>

    <div id="overlay"></div>

    <header id="navbar">
      <div class="container gutter">
        <div class="logo">
        </div>
        
        <!-- <toggle-switch></toggle-switch> -->

        <div class="navlinks">
          
          <span class="navlink">Home</span>
          <span class="navlink">About</span>
          <span class="navlink">Porfolio</span>
          <span class="navlink">Contact</span>
          <span class="navlink">3D</span>
        </div>

        <div id="hamburger">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </div>
      </div>
    </header>

    <div id="blur-container">
      <slot />
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
    const elem = this.shadowRoot.querySelector('#web-comp');

    console.log('hello from index.js');

    // const qs = (x) => document.querySelector(x);
    // const qsAll = (x) => document.querySelectorAll(x);
    const qs = (x) => this.shadowRoot.querySelector(x);
    const qsAll = (x) => this.shadowRoot.querySelectorAll(x);
    
    // ==============================================
    
    const hamburger = qs('#hamburger');
    const navdrawer = qs('#navdrawer');
    const overlay = qs('#overlay');
    const blur_container = qs('#blur-container');
    const navbar = qs('#navbar');
    
    console.log('navdrawer: ', navdrawer);
    
    // ==============================================
    
    const setupNavlinks = () => {
    
      // console.log('%c' + 'setupNavlinks()', 'color: orange');

      let page_idx = { current: 0, prev: null };
    
      const pages    = document.querySelectorAll('.page');
      const navlinks = qsAll('.navlink');
    
      const routes = [
        {
          page: 'home',
          path: '/'
        },
        {
          page: 'about',
          path: '/about'
        },
        {
          page: 'portfolio',
          path: '/portfolio'
        },
        {
          page: 'contact',
          path: '/contact'
        },
        {
          page: 'threeD',
          path: '/3D'
        },
      ];
    
      console.log('navlinks: ', navlinks);
      navlinks.forEach((navlink, idx) => {
        navlink.addEventListener('click', () => {
          
    
          // 5-navlinks in navbar and navdrawer
          const nav_idx = idx % routes.length;
          console.log('clicked', nav_idx);
          
          // update state:
          page_idx = { current: nav_idx, prev: page_idx.current };
    
          // update pages:
          const prev_page = pages[page_idx.prev];
          const curr_page = pages[nav_idx];
    
          // reset z-index and fade out prev-page
          gsap.to(prev_page, {
            opacity: 0,
            onComplete: () => {
              prev_page.style.zIndex = 0;
            }
          });
    
          // Remove .active from prev. nav-link
          // navlinks[page_idx.prev].classList.remove('active')
          navlinks.forEach(x => x.classList.remove('active')); // Reset-all for simple navlink start on page refresh.
    
          // Set currently clicked navlink to active
          navlink.classList.add('active');
    
          // Change the SPA 'page' and set the URL's path.
          const path = routes[nav_idx].path;
          window.history.pushState({}, '', path);
          window.localStorage.setItem('path', JSON.stringify(path));
          curr_page.style.zIndex = 1;
          gsap.to(curr_page, { 
            opacity: 1,
          });
    
          // Fire event for local-storage 'path' changed
          fireEvent('local-storage-path-modified');
        });
      });
    
      // --------------------------------------------
    
      window.addEventListener('load', (event) => {

        console.log('%c' + 'load event handler', 'color: yellow');
    
        // For initial page load on /
        // startSmoothScroll();
    
        const path_local_storage = JSON.parse(window.localStorage.getItem('path'));
        
        // page_idx Hack: Just hard code the previous path. Can store page_idx object in local storage in want to store actual previous path.
        


        const resetPages = () => {
          pages.forEach(page => {
            page.style.zIndex = 0;
            page.style.opacity = 0;
          });  
        };
        resetPages();

        const initializePage = () => {
          console.log('%c' + "initializePage()", 'color: green');
          console.log('pages: ', pages);
          pages[0].style.zIndex = 1;
          pages[0].style.opacity = 1;
          navlinks[0].classList.add('active');
          navlinks[5].classList.add('active');
          page_idx = { current: 0, prev: 1 };
        };

        if (path_local_storage === null) {
          console.log('%c' + 'path_local_storage === null', 'color: red');
          window.localStorage.setItem('path', JSON.stringify('/'));
          initializePage();
        }
        




        if (path_local_storage === '/') {
          
          initializePage();
        }
        else if (path_local_storage === '/about') {
          pages[1].style.zIndex = 1;
          pages[1].style.opacity = 1;
          navlinks[1].classList.add('active');
          navlinks[6].classList.add('active');
          window.history.replaceState({}, '', '/about');
          page_idx = { current: 1, prev: 0 };
        }
        else if (path_local_storage === '/portfolio') {
          pages[2].style.zIndex = 1;
          pages[2].style.opacity = 1;
          navlinks[2].classList.add('active');
          navlinks[7].classList.add('active');
          window.history.replaceState({}, '', '/portfolio');
          page_idx = { current: 2, prev: 0 };
        }
        else if (path_local_storage === '/contact') {
          pages[3].style.zIndex = 1;
          pages[3].style.opacity = 1;
          navlinks[3].classList.add('active');
          navlinks[8].classList.add('active');
          window.history.replaceState({}, '', '/contact');
          page_idx = { current: 3, prev: 0 };
        }
        else if (path_local_storage === '/3D') {
          pages[4].style.zIndex = 1;
          pages[4].style.opacity = 1;
          navlinks[4].classList.add('active');
          navlinks[9].classList.add('active');
          window.history.replaceState({}, '', '/3D');
          page_idx = { current: 4, prev: 0 };
        }
  
        gsap.fromTo(document.querySelector('body'), {opacity: 0}, {opacity: 1, duration: 1, delay: 0.5})
  
        listenForEvent('local-storage-path-modified', () => {
          console.log('Event Fired: path changed and local storage "path" set');
  
          // const path_local_storage = JSON.parse(window.localStorage.getItem('path'));
          // if (path_local_storage === '/') {
          //   startSmoothScroll();
          // }
          // else {
          //   stopSmoothScroll();
          // }
  
        });
      
      });
    
    };
    setupNavlinks();
    
    // ==============================================
    
    const setupSideDrawer = () => {
      let is_open = false;
      const setIsOpen = (bool) => {
        console.log('changing open state!');
        is_open = bool;
      };
    
      let tl;
    
      const openDrawer = (e) => {
        console.log('is_open: ', is_open);
        if (!is_open) {
          console.log('opening');
          // e.stopPropagation();
    
          overlay.style.display = 'block';
          
          
          tl = gsap.timeline();
          tl.to(navdrawer, {
            x: 0,
            duration: 0.3,
          });
    
          tl.to(overlay, {
            opacity: 1,
            onComplete: () => overlay.style.pointerEvents = 'auto',
            onReverseComplete: () => {
              overlay.style.display = 'none';
              overlay.style.pointerEvents = 'none';
            }
          }, '<=')
    
          tl.to(blur_container, {
            filter: 'blur(3px)'
          }, '<=');
    
          // The navbar disapears if navbar is inside blur-container!
          // -Instead, header.navbar taken outside of blur-container
          //  and blur applied to each one seperately.
          tl.to(navbar, {
            filter: 'blur(3px)'
          }, '<=');
    
    
    
        setIsOpen(true);
        }
      };
    
      const closeDrawer = (e) => {
    
        // if (is_open && click_x_coord > drawer_width_JS) {
        if(is_open) {
          console.log('closing');
          tl.reverse();
          setIsOpen(false);
        }
        
      };
      
      // Open drawer with hamburger button click:
      hamburger.addEventListener('click', openDrawer);
      
      // Close with click outside of drawer:
      overlay.addEventListener('click', closeDrawer);
    };
    setupSideDrawer();
    
    // ==============================================
  }

  disconnectedCallback() {
    const elem = this.shadowRoot.querySelector('#web-comp')
  }
}

window.customElements.define('nav-layout', WebComp);