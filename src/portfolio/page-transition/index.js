import { listenForEvent, fireEvent } from './js/custom-events.js';
import './web-comps/_template.js';

console.log('hello from index.js');

const qs = (x) => document.querySelector(x);
const qsAll = (x) => document.querySelectorAll(x);

// ==============================================

const setupNavlinks = () => {

  let page_idx = { current: 0, prev: null };

  const pages    = qsAll('.page');
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

    // For initial page load on /
    // startSmoothScroll();

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

        // const path_local_storage = JSON.parse(window.localStorage.getItem('path'));
        // if (path_local_storage === '/') {
        //   startSmoothScroll();
        // }
        // else {
        //   stopSmoothScroll();
        // }

      });
    } // else
  });

};
setupNavlinks();

// ==============================================
