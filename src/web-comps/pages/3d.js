import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
// import './lib/dat.gui/build/dat.gui.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    * {
      color: red;
    }
  </style>

  <main id="threeD-page" class="page" style="padding: 0;">
  </main>

  <!-- <script type="text/javascript" src="./lib/dat.gui/build/dat.gui.js"></script> -->

    <style>
      .dg.ac {
        background: red;
        z-index: 100;
        top: 500px;
      }
    </style>
`;

class WebComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // const elem = this.shadowRoot.querySelector('#web-comp');

    const raycaster = new THREE.Raycaster();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,                       // field of view [deg.]
      innerWidth / innerHeight, // aspect ratio of scene
      0.1,                      // clipping plane (near)
      1000,                     // clipping plane (far)
    );

    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setPixelRatio(window.devicePixelRation);

    this.shadowRoot.querySelector('#threeD-page').appendChild(renderer.domElement);

    // Specify what camera to control and where to render in DOM:
    new OrbitControls(camera, renderer.domElement);

    // - - - - - - - - - - - - - - - - - - - - 

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(boxGeometry, material1);
    scene.add(cube);

    // - - - - - - - - - - - - - - - - - - - - 

    const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
    const material2 = new THREE.MeshPhongMaterial({ 
      color: 0x000fff,
      side: THREE.DoubleSide,
      flatShading: THREE.FlatShading
    });
    const plane = new THREE.Mesh(planeGeometry, material2);
    scene.add(plane);

    console.log('plane mesh vertices: ', 
      plane.geometry.attributes.position.array // position contains all the data related to each vertex [x1, y1, z1, x2, y2, z2, ...]
    );

    const { array } = plane.geometry.attributes.position;
    for (let i = 0; i < array.length; i += 3) {
      const x = array[i];
      const y = array[i+1];
      const z = array[i+2];

      array[i] = x + 3;
      array[i + 2] = z + Math.random();
    }

    // const generatePlane = () => {
    //   plane.geometry.dispose();
    //   plane.geometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height, world.plane.width_segments, world.plane.height_segments);
    //   console.log('world.plane.width', world.plane.width);

    //   // Reset vertices
    //   const { array } = plane.geometry.attributes.position;
    //   for (let i = 0; i < array.length; i += 3) {
    //     const x = array[i];
    //     const y = array[i+1];
    //     const z = array[i+2];

    //     array[i] = x + 3;
    //     array[i + 2] = z + Math.random();
    //   }
    // };

    // const gui = new dat.GUI();
    // const world = {
    //   plane: {
    //     width: 5,
    //     height: 5,
    //     width_segments: 10,
    //     height_segments: 10
    //   },
    // };
    // console.log('gui: ', gui);
    // gui.add(world.plane, "width", 1, 10,).onChange(generatePlane);
    // gui.add(world.plane, "height", 1, 10,).onChange(generatePlane);
    // gui.add(world.plane, "width_segments", 1, 10,).onChange(generatePlane);
    // gui.add(world.plane, "height_segments", 1, 10,).onChange(generatePlane);

    // - - - - - - - - - - - - - - - - - - - - 
    
    const light = new THREE.DirectionalLight(0xffffff, 1, );
    light.position.set(0, 0, 1); // x, y, z
    scene.add(light);

    const back_light = new THREE.DirectionalLight(0xffffff, 1, );
    back_light.position.set(0, 0, -1); // x, y, z
    scene.add(back_light);

    // - - - - - - - - - - - - - - - - - - - - 
    // Events

    const mouse = {
      x: undefined,
      y: undefined,
      set(x, y) {
        this.x = +(x / innerWidth)  * 2 - 1;
        this.y = -(y / innerHeight) * 2 + 1;
      }
    };

    window.addEventListener('mousemove', (event) => {
      mouse.set(event.clientX, event.clientY);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(plane);
      if (intersects.length > 0) {
        console.log('intersecting');
      }

      // console.log('mouse: ', mouse);
      // console.log('intersects: ', intersects);
    });

    // - - - - - - - - - - - - - - - - - - - - 

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }
    animate();

    // - - - - - - - - - - - - - - - - - - - -     
  }

  disconnectedCallback() {
    // const elem = this.shadowRoot.querySelector('#web-comp')
  }
}

window.customElements.define('page-3d', WebComp);