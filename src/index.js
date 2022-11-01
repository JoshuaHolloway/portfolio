import { startSmoothScroll, stopSmoothScroll } from './functions/smooth-scroll.js';

gsap.registerPlugin(ScrollTrigger);

const qs = x => document.querySelector(x);

const hamburger = qs('header .hamburger');
const navdrawer = qs('nav#navdrawer');
const overlay = qs('#overlay');
const blur_container = qs('#blur-container');

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
];

const navlinks = document.querySelectorAll('.navlink');
let page_idx = { current: 0, prev: null};
navlinks.forEach((navlink, idx) => {

  // 4 navlinks in navbar, 4 in navdrawer
  const navlink_num = idx % 4; 

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
    const fireEvent = (event_name) => {
      const event = new Event(event_name);
      document.dispatchEvent(event);
    };
    fireEvent('local-storage-path-modified');
    
  });
});


// ==============================================

window.addEventListener('load', (event) => {

  // For initial page load on /
  startSmoothScroll();

  const path_local_storage = JSON.parse(window.localStorage.getItem('path'));
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
    }
    else if (path_local_storage === '/about') {
      pages[1].style.zIndex = 1;
      pages[1].style.opacity = 1;
      navlinks[1].classList.add('active');
      window.history.replaceState({}, '', '/about');
    }
    else if (path_local_storage === '/portfolio') {
      pages[2].style.zIndex = 1;
      pages[2].style.opacity = 1;
      navlinks[2].classList.add('active');
      window.history.replaceState({}, '', '/portfolio');
    }
    else if (path_local_storage === '/contact') {
      pages[3].style.zIndex = 1;
      pages[3].style.opacity = 1;
      navlinks[3].classList.add('active');
      window.history.replaceState({}, '', '/contact');
    }

    gsap.fromTo(document.querySelector('body'), {opacity: 0}, {opacity: 1, duration: 1, delay: 0.5})


    const listenForEvent = (event_name, fn) => {
      document.addEventListener(event_name, e => fn(e), false);
    };
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
  // Parallax animation:
  const bigYellowCircle = document.querySelector('#download');
  // var blueSquare = document.querySelector('#blueSquare');
  // var greenPentagon = document.querySelector('#greenPentagon');
  
  function setTranslate(xPos, yPos, el) {
    el.style.transform = 'translate3d(' + xPos + ', ' + yPos + 'px, 0)';
  }
  
  window.addEventListener('DOMContentLoaded', scrollLoop, false);
  
  let xScrollPosition;
  let yScrollPosition;
  
  function scrollLoop() {
    xScrollPosition = window.scrollX;
    yScrollPosition = window.scrollY;
  
    setTranslate(0, yScrollPosition * 0.2, bigYellowCircle);
    // setTranslate(0, yScrollPosition * -1.5, blueSquare);
    // setTranslate(0, yScrollPosition * -0.2, greenPentagon);
  
    requestAnimationFrame(scrollLoop);
  }
};

parallaxAnim();

// ==============================================

const scrollAnimation = () => {
  
  // Execute callback each time the visibility of one of the observed elements changes.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {

      console.log('entry: ', entry);

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

const svgAnimation = () => {


};

svgAnimation();