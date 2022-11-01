  1. Build system (custom)
  2. Page transition (SPA-like)
  3. Click on link changes URL route
  4. Active navlink
5. Animate navbar on scroll
6. Begin the navdrawer navlink animations
7. Scroll Trigger section animation

-Grid (Responsive)
-Animate navbar.
-Animate navlinks.
-Hover on animate line
-Animate hamburger bar


--a-tag used for link
---disable default behavior on a-tag click

==============================================================

Video 3 Prep:

- Page refresh redirects back to /route
  --Step 1: Start on path /about
  --Step 2: User refreshes page
  --Step 3: src/about/index.html is loaded
  --Step 4: on the load event on the window a callback is run.
  --Step 5: In the callback we set local stroage key='path' to value='/about'
  --Step 6: Redirect user to /index.html via window.location.pathname = '/'.
  --Step 7: In index.js (loaded in index.html) on the window 'load'-event a callback is run.
  --Step 8: In this callback we grab the 'path' local stroage value via window.localStorage.getItem('path').
  --Step 9: window.localStorage.getItem('path') returns null if there is no key with the name 'path' in local-storage.
    ---So we see if the returned value is null. If not, then this value is set.
    ---So we need to do three things:
      ----1. Set the active navlink (both in navbar and navdrawer)
      ----2. Set the zIndex on the active page.
      ----3. Set the URL path.


Open drawer with click on hamburger.
Close drawer with click outside the drawer (when opened).
  -If user clicks on the hamburger then we first evaluate if drawer is open.
    --If drawer is not open:
      ---stop propagation of the event from moving up beyond the hamburger
      ---disable the pointer events on the button (avoid double click)
      ---run the animation on the drawer.
      ---onComplete(), re-enable pointer events for the hamburger button.
      ---set drawer_open = true;
