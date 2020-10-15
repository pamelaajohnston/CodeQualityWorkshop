console.log("Start");
width = 10;
height = 10;

function createGrid(h, w){
  var a=[];
  var b=[];
  for (var j=0;j<h;j++) {
    a[j] = []
    for (var i=0; i<w; i++) {
      a[j][i]=Math.floor(Math.random() * 10) % 2;
    }
  }
  return a;
}


function prettyPrint2DArray(a, w, h){
var outputString = '';
for (var j=0; j<h; j++){
    for (var i=0; i<w; i++){
      outputString += String(a[j][i]);
    }
    outputString += "\n";
  }
  console.log(outputString)
  return h;
}

function prettyPrint2DArray_html(a, w, h, liveCell, deadCell){
  var outputString = '-------<br />';
  for (var j=0; j<h; j++){
  outputString += "|";
    for (var i=0; i<w; i++){
      if (a[j][i] == 1){
        outputString += liveCell;
      } else {
        outputString += deadCell;
      }

    }
    outputString += "|<br />";
  }
  outputString += '-------<br />';
  console.log(outputString)
  return outputString;
}

function draw(a, w, h) {
  var canvas = document.getElementById('gridCanvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    // There might be a better way to calculate width and height.
    blockWidth = 15;
    blockHeight = 15;
    for (var j=0; j<h; j++){
      for (var i=0; i<w; i++){
        xco = i*blockWidth;
        yco = j*blockHeight;
        if (a[j][i] == 1){
          ctx.fillStyle = 'black';
          ctx.fillRect(xco, yco, blockWidth, blockHeight);
        } else {
          ctx.fillStyle = 'yellow';
          ctx.fillRect(xco, yco, blockWidth, blockHeight);
        }

      }
    }
  }
}


function updateGrid(a, w, h){
  // iterate through the grid
  // Rules taken from here
  // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
  // Any live cell with two or three live neighbours survives.
  // Any dead cell with three live neighbours becomes a live cell.
  // All other live cells die in the next generation. Similarly, all other dead cells stay dead.

  var newa = [];
  var liveNeighbours = 0;
  //let newa = a.slice();
  //console.log("Here's newa")
  //console.log(newa)
  for (var j=0; j<h; j++){
    newa[j] = []
    for (var i=0; i<w; i++){
      // deal with borders
      startx = -1;
      starty = -1;
      endx = 2;
      endy = 2;
      if (j==0) starty = 0;
      if (i==0) startx = 0;
      if (j==(h-1)) endy = 1;
      if (i==(w-1)) endx = 1;
      // count the live neighbours
      liveNeighbours = 0;
      for (y=starty; y<endy; y++){
        for (x=startx; x<endx; x++){
          liveNeighbours += a[j+y][i+x];
          //console.log("index ("+i+x+","+j+y+") is " + a[j+y][i+x])
        }
      }
      // oops
      liveNeighbours -= a[j][i];

      //console.log("Index (" + i + ", " + j + ") is " + a[j][i] + " has " + liveNeighbours + " neighbours")

      // rules for next generation...
      newa[j][i] = a[j][i]
      if ((liveNeighbours < 2) || (liveNeighbours > 3)) {
        newa[j][i] = 0
      }
      if (liveNeighbours == 3){
         newa[j][i] = 1
      }
    }
  }
  return newa
}

function newGrid(){
  myGrid = createGrid(width, height);
  myString = prettyPrint2DArray_html(myGrid, width, height, "1", "0");
  document.getElementById("gridDisplay").innerHTML = myString;
  draw(myGrid, width, height);
}

function iterate(){
  myGrid = updateGrid(myGrid, width, height)
  //prettyPrint2DArray(myGrid, width, height)
  myString = prettyPrint2DArray_html(myGrid, width, height, "1", "0");
  document.getElementById("gridDisplay").innerHTML = myString;
  draw(myGrid, width, height);
}


myGrid = createGrid(width, height)
//myGrid = [
//  [ 0, 1, 1, 1, 0 ],
//  [ 0, 1, 1, 0, 0 ],
//  [ 0, 0, 1, 0, 1 ],
//  [ 0, 1, 0, 1, 0 ],
//  [ 1, 1, 0, 0, 0 ]
//]
//console.log(myGrid)
/// original loop.
prettyPrint2DArray(myGrid, width, height)

for (loopCount=0; loopCount<3; loopCount++){
  console.log("loop " + loopCount)
  myGrid = updateGrid(myGrid, width, height)
  prettyPrint2DArray(myGrid, width, height)
}
