const template = document.createElement('template');
template.innerHTML = `


    <main id="home-page" class="page gutter" >

      <section id="hero">
        
        <div class="left">
          <div class="container">
            <h2 class="hero__super-title stagger1">Hello, I'm</h2>
            
            <h1 class="hero__title">Josh.Holloway</h1>
            <web-comp />
            <h3 class="hero__sub-title stagger1">Full Stack JavaScript Developer</h3>
            <p class="hero__description stagger1">I specialize in the creation of bad ass web-apps.</p>
            
            <p>🚧 Website under construction!!! 🚧</p>
            <p>🚧 Check back over the month of Nov. 🚧</p>

            

            <div class="lottie-container">
              <div class="lottie-svg hide" id="svg"></div>

              <a
                id="lottie-play-button"
                class="stagger1 btn shadow"
                href="#" 
                onclick="this.href='data:text/html;charset=UTF-8,' + encodeURIComponent(document.documentElement.outerHTML)"
                download="joshua-holloway.com.html"
              >
                Download Page
              </a>

              <a
                class="stagger1 btn shadow"
                href="#" 
              >
                Featured Project
              </a>

            </div>

          </div>
        </div>

        <!-- <div class="right">
          <lottie-player 
            src="./Untitled-2.json"  
            background="transparent"  
            speed="1"  
            style="width: 300px; height: 300px;"  
          >
          </lottie-player>
          <script>
            const player = document.querySelector("lottie-player");
            console.log('player: ', player);
            player.addEventListener("rendered", (e) => {
              setTimeout(() => {
                player.play();
              }, 1000);
            });
          </script>
        </div> -->

      </section>

      

      <section id="skills" class="center">
        <div class="container">
          <h1 class="hidden">Text Slide</h1>
          <p class="hidden">This is text sliding...</p>
          <h3 class="hidden">Text sliding with staggering!!</h3>
        </div>

      </section>

      <section id="featured-project">
        <h2>Feature Project</h2>
      </section>
      


      <div class="float one shadow"></div>
      <div class="float two shadow"></div>
      <div class="float three shadow"></div>
      <div class="float four shadow"></div>
      
    </main>
`;

export default template;