var Jimp = require('jimp');
 
// open a file called "lenna.png"
Jimp.read('capybara.jpg', (err, lenna) => {
  if (err) throw err;
  lenna
    .resize(256, 256) // resize
    .quality(60) // set JPEG quality
    .greyscale() // set greyscale
    .write('villanelle-small-bw.jpg'); // save
});