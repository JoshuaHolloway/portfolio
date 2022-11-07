let smooth_scroll_animation_frame_ref;

const fireEvent = (event_name) => {
  const event = new Event(event_name);
  document.dispatchEvent(event);
};

const startSmoothScroll = () => {
  let current = 0;
  let target = 0;
  let ease = 0.1;

  let containerHeight;
  let skewDiff;

  let container = document.querySelector('.page');


  function lerp(start, end, t){
    return start * (1 - t) + end * t;
  }

  function setTransform(el, transform){
    el.style.transform = transform;
  }

  function setupAnimation(){
    containerHeight = container.getBoundingClientRect().height;
    document.body.style.height = `${containerHeight}px`;
    smoothScroll()
  }

  const setupParallaxElems = () => {
    const qs = (x) => document.querySelector(x);

    const one = qs('.float.one');
    const two = qs('.float.two');
    const three = qs('.float.three');
    const four = qs('.float.four');
    
    function setTranslate(xPos, yPos, el) {
      // el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
      el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    function parallaxStep(y_scroll_with_inertia) {
      // yScrollPosition = window.scrollY;
    
      setTranslate(0, y_scroll_with_inertia * 1.05, one);
      setTranslate(0, y_scroll_with_inertia * 1.3, two);
      setTranslate(0, y_scroll_with_inertia * 1.2, three);
      setTranslate(y_scroll_with_inertia * -1,  y_scroll_with_inertia * 1.1, four);
    }

    return parallaxStep;
  };

  const parallaxStep = setupParallaxElems();

  let fired = false;


  
  function smoothScroll(){
    current = lerp(current, target, ease);
    current = parseFloat(current.toFixed(2));
    target = window.scrollY;
    skewDiff = (target - current) * .015
    setTransform(container, `translateY(${-current}px) skewY(${skewDiff}deg) `);
    parallaxStep(current);

    // if (target > document.body.scrollHeight / 2 && fired === false) {
    //   // Step 1: Fire event.
    //   console.log('\x1b[32m%s\x1b[0m', 'firing event!');
    //   fireEvent('scrolled-to-middle-of-page');
    //   fired = true;

    //   // Step 2: In the toggle-button web-component listen for the event and respond to it firing.
    //   // Step 3: In the callback select the toggle-switch.
    // }

    smooth_scroll_animation_frame_ref = requestAnimationFrame(smoothScroll)
  }

  setupAnimation()
};

const stopSmoothScroll = () => window.cancelAnimationFrame(smooth_scroll_animation_frame_ref);

export { startSmoothScroll, stopSmoothScroll };