
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

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



imgs[0].addEventListener('load', function() {

  canvas.width = this.naturalWidth;
  canvas.height = this.naturalHeight;

  ctx.drawImage(this, 0 , 0);

  ctx.drawImage(this, 0 , 0, this.width, this.height);
});

const drawImage = (idx) => {
  const img = imgs[idx];
  ctx.drawImage(imgs[idx], 0 , 0);

  img.width
};

let x_scroll = 0;
let y_scroll = 0;
const scrollLoop = (e) => {
  x_scroll = scrollX;
  y_scroll = scrollY;

  console.log('scrollY: ', scrollY);

  const idx = Math.round(scrollY / 8);
  if (idx < 42)
    drawImage(idx);
    

  requestAnimationFrame(scrollLoop);
};
scrollLoop();

