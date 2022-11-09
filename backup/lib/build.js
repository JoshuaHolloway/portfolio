const fs = require('fs');
const HTMLParser = require('node-html-parser');

const build = () => {
  let html;
  try { html = fs.readFileSync(`./src/index.html`, 'utf-8');} 
  catch (err) { console.error(err); }

  const html_parsed = HTMLParser.parse(html);
  const body = html_parsed.querySelector('body');
  const body_inner_html = body.innerHTML;

  let css;
  console.blue('Processing .css');
  try { css = fs.readFileSync('./src/index.css', 'utf-8'); }
  catch (err) { console.error(err); }


  let js;
  console.blue('Processing .js');
  try { js = fs.readFileSync('./src/index.js', 'utf-8'); }
  catch (err) { console.error(err); }

  const head_open = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Josh Holloway</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js"></script>
  `;
  const head_close = `</head>`;


  const output = `
  ${head_open}
  <style>
    ${css}
  </style>
  ${head_close}

  <body>
    ${body_inner_html}

    <script>
      ${js}
    </script>
  </body>
  `;

  console.blue('Processing .html');
  fs.writeFileSync('./dist/index.html', output, err => {
    if (err)  console.err(err);
    else      console.log('file written successfully!')
  });

  console.blue('Copying static files:\t/src/static  ->  /dist');
  fs.copyFile('./src/favicon.ico', './dist/favicon.ico', () => {
    console.green('File copied successfully.');
  });
};

module.exports = build;