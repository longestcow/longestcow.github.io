// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let size = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  background(220);
  noStroke();
  drawGrid();
}

function draw() {
  if(mouseIsPressed){
    if(mouseButton===LEFT && size-2>0)size-=2;
    else size+=2;
    drawGrid();
  }
  if(keyIsPressed) drawGrid();
}

function drawGrid(){
  for(let i = 0; i<width; i+=size){
    for(let j = 0; j<height; j+=size){
      fill(color(255,random(200),random(256)));
      rect(i,j,size,size);
    }
  }
}
