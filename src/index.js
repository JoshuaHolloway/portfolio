import { startSmoothScroll, stopSmoothScroll } from './functions/smooth-scroll.js';
import { listenForEvent, fireEvent } from './functions/custom-events.js';

gsap.registerPlugin(Flip, ScrollTrigger);

const qs = x => document.querySelector(x);

const hamburger = qs('header .hamburger');
const navdrawer = qs('nav#navdrawer');
const overlay = qs('#overlay');
const blur_container = qs('#blur-container');
const navbar = qs('header#navbar');

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

const pages = document.querySelectorAll('.page');

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

// Navbar navlinks (navdrawer navlinks not handled yet)
const navlinks = document.querySelectorAll('#navbar .navlinks > .navlink');
let page_idx = { current: 0, prev: null};
navlinks.forEach((navlink, idx) => {

  const navlink_num = idx; 

  navlink.addEventListener('click', () => {

    // update state
    page_idx = {current: navlink_num, prev: page_idx.current};

    // reset z-index and fade out prev-page:
    const prev_page = pages[page_idx.prev];
    const curr_page = pages[navlink_num];
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
    const path = routes[navlink_num].path;
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


// ==============================================

window.addEventListener('load', (event) => {

  // For initial page load on /
  startSmoothScroll();

  const path_local_storage = JSON.parse(window.localStorage.getItem('path'));
  
  // page_idx Hack: Just hard code the previous path. Can store page_idx object in local storage in want to store actual previous path.
  
  if (path_local_storage === null) {
    // Initial page load => Set 'home' as active navlink
    navlinks[0].classList.add('active');

    // Set local storage 'path' to '/'
    window.localStorage.setItem('path', JSON.stringify('/'));
  
    gsap.fromTo(document.querySelector('body'), {opacity: 0}, {opacity: 1, duration: 0})
  }
  else{
    pages.forEach(page => {
      page.style.zIndex = 0;
      page.style.opacity = 0;
    });

    if (path_local_storage === '/') {
      pages[0].style.zIndex = 1;
      pages[0].style.opacity = 1;
      navlinks[0].classList.add('active');
      page_idx = { current: 0, prev: 1 };
    }
    else if (path_local_storage === '/about') {
      pages[1].style.zIndex = 1;
      pages[1].style.opacity = 1;
      navlinks[1].classList.add('active');
      window.history.replaceState({}, '', '/about');
      page_idx = { current: 1, prev: 0 };
    }
    else if (path_local_storage === '/portfolio') {
      pages[2].style.zIndex = 1;
      pages[2].style.opacity = 1;
      navlinks[2].classList.add('active');
      window.history.replaceState({}, '', '/portfolio');
      page_idx = { current: 2, prev: 0 };
    }
    else if (path_local_storage === '/contact') {
      pages[3].style.zIndex = 1;
      pages[3].style.opacity = 1;
      navlinks[3].classList.add('active');
      window.history.replaceState({}, '', '/contact');
      page_idx = { current: 3, prev: 0 };
    }
    else if (path_local_storage === '/3D') {
      pages[4].style.zIndex = 1;
      pages[4].style.opacity = 1;
      navlinks[4].classList.add('active');
      window.history.replaceState({}, '', '/3D');
      page_idx = { current: 4, prev: 0 };
    }

    gsap.fromTo(document.querySelector('body'), {opacity: 0}, {opacity: 1, duration: 1, delay: 0.5})


    listenForEvent('local-storage-path-modified', () => {
      console.log('Event Fired: path changed and local storage "path" set');

      const path_local_storage = JSON.parse(window.localStorage.getItem('path'));
      if (path_local_storage === '/') {
        startSmoothScroll();
      }
      else {
        stopSmoothScroll();
      }

    });
  } // else
});

// ==============================================

// GSAP loading animation:
const gsapLoadAnim = () => {

  const tl = gsap.timeline();

  tl.from('#hero .left', {
    y: '-30%',
    opacity: 0,
    duration: 2,
    ease: Power4.easeOut
  });

  tl.from('.stagger1', {
      opacity: 0,
      y: -50,
      stagger: .3,
      ease: Power4.easeOut,
      duration: 2
  }, "-=1.5");

  tl.from('#hero .right svg', {
    opacity: 0, y: 50, ease: Power4.easeOut, duration: 1
  }, "-=2");

  gsap.from('#hero .right svg > rect', { 
    stagger: 0.2,
    scale: 0.1,
    duration: 1,
    ease: Back.easeOut.config(1.7)
  });

};
gsapLoadAnim();

// ==============================================

const parallaxAnim = () => {

  const qs = (x) => document.querySelector(x);

  const one = qs('.float.one');
  const two = qs('.float.two');
  const three = qs('.float.three');
  const four = qs('.float.four');
  
  function setTranslate(xPos, yPos, el) {
    // el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }
  
  window.addEventListener('DOMContentLoaded', scrollLoop, false);
  
  let yScrollPosition;
  
  function scrollLoop() {
    yScrollPosition = window.scrollY;
  
    setTranslate(0, yScrollPosition * 1.05, one);
    setTranslate(0, yScrollPosition * 1.3, two);
    setTranslate(0, yScrollPosition * 1.2, three);
    setTranslate(yScrollPosition * -1,  0, four);
  
    requestAnimationFrame(scrollLoop);
  }
};

// parallaxAnim();

// ==============================================

const scrollAnimation = () => {
  
  // Execute callback each time the visibility of one of the observed elements changes.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // console.log('entry: ', entry);
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
      else {
        entry.target.classList.remove('show');
      }

    });
  });
  
  const hidden_elements = document.querySelectorAll('.hidden');

  hidden_elements.forEach(el => observer.observe(el));
};

scrollAnimation();

// ==============================================

const navbarAnimation = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: navbar,
      start: `bottom 100px`, // when the bottom of the trigger hits 100px from the top of the viewport
      // scrub: 1,
      // markers: true,
      toggleActions: "restart none none reverse"
    },
  });

  tl.fromTo(
    navbar,
    {
      backgroundColor: 'rgba(255 255, 255, 0)',
      height: '100px',
    },
    {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', 
      height: '85px',
      color: 'black'
    },
  );

  // tl.fromTo(
  //   '#navbar .navlink',
  //   { color: 'white' },
  //   { color: 'black'}, 
  //   '<='
  // );

};

navbarAnimation();

// ===============================================

const downloadButtonAnim = () => {
  const lottieSVG = document.querySelector('.lottie-svg');
  const animItem = bodymovin.loadAnimation({
    wrapper: lottieSVG,
    animType: 'svg',
    loop: false,
    autoplay: false,
    path: 'https://assets2.lottiefiles.com/packages/lf20_u4yrau.json'
  });
  
  
  const lottie_play_button = document.querySelector('#lottie-play-button');
  lottie_play_button.addEventListener('click', () => {
    lottieSVG.classList.remove('hide');
    animItem.goToAndPlay(0, true);
  });

  animItem.addEventListener('complete', () => {
    lottieSVG.classList.add('hide')
  });
};
downloadButtonAnim();

// ==============================================

// const pageLoadHeroAnim = () => {
//   const player = document.querySelector("lottie-player");
//   console.clear();
//   console.log('player: ', player);
  
//   player.addEventListener("rendered", (e) => {
//     console.log('LOADED!');
//     setTimeout(() => {
//       player.play();
//     }, 1000);
//   });
// };
// pageLoadHeroAnim();