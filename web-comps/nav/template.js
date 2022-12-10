const template = document.createElement('template');
template.innerHTML = `

  <div id="web-comp">

    <div id="navdrawer">
      <nav>
        <span class="navlink">page 0</span>
        <span class="navlink">page 1</span>
        <span class="navlink">page 2</span>
        <span class="navlink">page 3</span>
        <span class="navlink">page 4</span>
      </nav>
    </div>

    <div id="overlay"></div>

    <header id="navbar">
      <div class="container gutter">
        <div class="logo">
        </div>
        
        <!-- <toggle-switch></toggle-switch> -->

        <div class="navlinks">
          
          <span class="navlink">Home</span>
          <span class="navlink">About</span>
          <span class="navlink">Porfolio</span>
          <span class="navlink">Contact</span>
          <span class="navlink">3D</span>
        </div>

        <div id="hamburger">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </div>
      </div>
    </header>

    <div id="blur-container">
      <slot />
    </div>

  </div>
`;

export default template;