const hamburger = document.querySelector('header .hamburger');
const navdrawer = document.querySelector('nav#navdrawer');

let is_open = false;

let tl;
hamburger.addEventListener('click', () => {

  const value = getComputedStyle(navdrawer).getPropertyValue('--width');
  console.log('value: ', value);

  console.log('is_open: ', is_open);
  if (is_open) {
    console.log('closing');
    hamburger.style.pointerEvents = 'none';
    tl.reverse();
  } else {
    console.log('opening');
    hamburger.style.pointerEvents = 'none';
    tl = gsap.timeline();
    tl.to('nav', {
      x: 0,
      onComplete: () => {
        hamburger.style.pointerEvents = 'auto';    
      },
      onReverseComplete: () => {
        hamburger.style.pointerEvents = 'auto';    
      },
    });
    
  }
  is_open = !is_open;

});

const pages = document.querySelectorAll('.page');

const navlinks = document.querySelectorAll('.navlink');
navlinks.forEach((navlink, idx) => {
  navlink.addEventListener('click', () => {

    pages.forEach(page => {
      page.style.zIndex = 0;
      gsap.to(page, {opacity: 0});
    });

    // Reset navlink's so that none of them are active
    navlinks.forEach(x => x.classList.remove('active'));

    // Set currently clicked navlink to active
    navlink.classList.add('active');

    // Change the SPA 'page' and set the URL's path.
    if (idx === 0) {
      window.history.pushState({}, '', '/');
      window.localStorage.setItem('path', JSON.stringify('/'));
      pages[0].style.zIndex = 1;
      gsap.to(pages[0], {opacity: 1});
    } else if (idx === 1) {
      window.history.pushState({}, '', '/about');
      window.localStorage.setItem('path', JSON.stringify('/about'));
      pages[1].style.zIndex = 1;
      gsap.to(pages[1], {opacity: 1});
    } else if (idx === 2) {
      window.history.pushState({}, '', '/portfolio');
      window.localStorage.setItem('path', JSON.stringify('/portfolio'));
      pages[2].style.zIndex = 1;
      gsap.to(pages[2], {opacity: 1});
    } else if (idx === 3) {
      window.history.pushState({}, '', '/contact');
      window.localStorage.setItem('path', JSON.stringify('/contact'));
      pages[3].style.zIndex = 1;
      gsap.to(pages[3], {opacity: 1});
    }

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

    gsap.fromTo(document.querySelector('body'), {opacity: 0}, {opacity: 1, duration: 1})


    const listenForEvent = (event_name, fn) => {
      document.addEventListener(event_name, e => fn(e), false);
    };
    listenForEvent('local-storage-path-modified', () => console.log('Event Fired: path changed and local storage "path" set'));
  }
});