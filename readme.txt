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
        ----Don't really need this now that I switched from window to overlay!
      ---display: block on overlay
        ----pointer-events on overlay is initially set to none => user cannot double click.
      ---run the animation(s):
        ----1. drawer transition to 0
        ----2. blur-container
        ----3. overlay-opacity
      ---onComplete():
        ---re-enable pointer events for the overlay to allow user to close drawer.
      ---onReverseComplete():
        ---Set the overlay to display none, and the pointer-events to none.
      ---set drawer_open = true;
  -If user clicks anywhere on the overlay (once it is display: block):
    --If drawer is open:
      ---reverse the timeline
      ---set drawer_open = false;


  -Since the navdrawer is a direct sibling of the overlay
   we don't need to check the clientX click coordinate
   and we also don't need to disable propagation of
   event bubling.
   --We only need to check that the user has clicked
     the actual overlay, which we are already doing!


  Web-comp workflow:
  1. Develop in stencil.
  2. Build.
  3. Copy www/build into src/web-comps/build.
  4. Link via same as done in www/index.html.