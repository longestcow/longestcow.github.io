// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let a=0,b=0,c=0,d=0;
let iRate=4;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  drawGrid();
}

function drawGrid(){
  fill(0);
  if(mouseX<width/2 && mouseY<height/2)a=255;
  else if(a-iRate>=0)a-=iRate;
  fill(a,0,255-a);
  rect(0,0,width/2,height/2);

  if(mouseX>width/2 && mouseY<height/2)b=255;
  else if(b-iRate>=0)b-=iRate;
  fill(b,0,255-b);
  rect(width/2,0,width/2,height/2);

  if(mouseX<width/2 && mouseY>height/2)c=255;
  else if(c-iRate>=0)c-=iRate;
  fill(c,0,255-c);
  rect(0,height/2,width/2,height/2);

  if(mouseX>width/2 && mouseY>height/2)d=255;
  else if(d-iRate>=0)d-=iRate;
  fill(d,0,255-d);
  rect(width/2,height/2,width/2,height/2);


}