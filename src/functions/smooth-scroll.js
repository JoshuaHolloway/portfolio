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





  function smoothScroll(){
      current = lerp(current, target, ease);
      current = parseFloat(current.toFixed(2));
      target = window.scrollY
      skewDiff = (target - current) * .015
      setTransform(container, `translateY(${-current}px) skewY(${skewDiff}deg) `);
      smooth_scroll_animation_frame_ref = requestAnimationFrame(smoothScroll)
  }

  setupAnimation()
};

const stopSmoothScroll = () => window.cancelAnimationFrame(smooth_scroll_animation_frame_ref);


export { startSmoothScroll, stopSmoothScroll };