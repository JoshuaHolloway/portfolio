
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const img = new Image(50, 50);
console.log('img: ', img);
img.src = './lena.jpg';
// img.onload

const imgs = [];
for (let i = 0; i < 42; ++i) {

  const img = new Image();
  if (i < 10) {
    img.src = `./img/A/000${i}.jpg`;
  }
  else if (i < 100) {
    img.src = `./img/A/00${i}.jpg`;
  }
  imgs.push(img);
}
console.log('imgs: ', imgs);


img.addEventListener('load', function() {
  console.log('this: ', this);

  canvas.width = this.naturalWidth;
  canvas.height = this.naturalHeight;

  ctx.drawImage(this, 0 , 0);

  ctx.drawImage(this, 0 , 0, this.width, this.height);
});

const setImage = (idx) => ctx.drawImage(imgs[idx], 0 , 0);

let x_scroll = 0;
let y_scroll = 0;
const scrollLoop = (e) => {
  x_scroll = scrollX;
  y_scroll = scrollY;

  console.log('scrollY: ', scrollY);

  const idx = Math.round(scrollY / 8);
  if (idx < 42)
    setImage(idx);

  requestAnimationFrame(scrollLoop);
};
scrollLoop();

