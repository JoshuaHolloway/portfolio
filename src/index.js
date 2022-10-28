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

    if (idx === 0) {
      window.history.pushState({}, '', '/');
      pages[0].style.zIndex = 1;
      gsap.to(pages[0], {opacity: 1});
    } else if (idx === 1) {
      window.history.pushState({}, '', '/about');
      pages[1].style.zIndex = 1;
      gsap.to(pages[1], {opacity: 1});
    } else if (idx === 2) {
      window.history.pushState({}, '', '/portfolio');
      pages[2].style.zIndex = 1;
      gsap.to(pages[2], {opacity: 1});
    } else if (idx === 3) {
      window.history.pushState({}, '', '/contact');
      pages[3].style.zIndex = 1;
      gsap.to(pages[3], {opacity: 1});
    }

    
  });
});