let smooth_scroll_animation_frame_ref;

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
      setTranslate(y_scroll_with_inertia * -1,  0, four);
    }

    return parallaxStep;
  };

  const parallaxStep = setupParallaxElems();

  function smoothScroll(){
    current = lerp(current, target, ease);
    current = parseFloat(current.toFixed(2));
    target = window.scrollY
    skewDiff = (target - current) * .015
    setTransform(container, `translateY(${-current}px) skewY(${skewDiff}deg) `);
    parallaxStep(current);
    smooth_scroll_animation_frame_ref = requestAnimationFrame(smoothScroll)
  }

  setupAnimation()
};

const stopSmoothScroll = () => window.cancelAnimationFrame(smooth_scroll_animation_frame_ref);

export { startSmoothScroll, stopSmoothScroll };