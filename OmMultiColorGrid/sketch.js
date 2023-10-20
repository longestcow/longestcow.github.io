// Multi-color Grid
// Om Iyer
// 28/9/2023
//
// Extra for Experts:
// - there is a slight theme (an ugly one) and the cells do not spill over
 
let _size = 10; //square cell size

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  background(220);
  noStroke();
  drawGrid();//first grid draw
}

function draw() {
  //i have nothing to put here
}

function drawGrid(){
  background(220);
  for(let i = 0; i<width-_size; i+=_size){ //the width-_size makes it so that no cell spills over
    for(let j = 0; j<height-_size; j+=_size){
      fill(color(random(100),random(256),random(256))); //r values being random(100) makes the theme
      rect(i,j,_size,_size);
    }
  }
}

function mousePressed(){
  if(mouseButton===LEFT && _size-2>6)_size-=2;
  else if(mouseButton===RIGHT) _size+=2;
  drawGrid();
}

function keyPressed(){
  drawGrid(); //draws new grid
}
