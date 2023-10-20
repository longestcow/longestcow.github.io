// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let posX=0, posY=0, s1=70, s2=50, xOff, yOff, held=false;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  fill(255,0,0);
  background(220);
  posX=width/2; posY=height/2;
}

function draw() {
  background(220);
  if(held) {
    posX=mouseX+xOff;
    posY=mouseY+yOff;
  }
  if(mouseX<=posX+s1/2&&mouseX>=posX-s1/2 && (mouseY<=posY+s2/2&&mouseY>=posY-s2/2)) {
    fill(200,0,0);
  } 
  else  {
    fill(255,0,0);
  }
  rect(posX,posY,s1,s2);
}

function mousePressed(){
  if((mouseX<=posX+s1/2||mouseX>=posX-s1/2) && (mouseY<=posY+s2/2||mouseY>=posY-s2/2)){
    held=true;
    xOff=posX-mouseX;
    yOff=posY-mouseY;
  }
}

function mouseReleased(){
  if(held){ 
    held=false;
  }
}
