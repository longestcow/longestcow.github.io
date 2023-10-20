// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let lionL, lionR, prevX=0, currImg;
function preload(){
  lionL=loadImage("assets/lion-left.png");
  lionR=loadImage("assets/lion-right.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  currImg=lionL;
}

function draw() {
  background(220);
  currImg=(prevX-mouseX>0)?lionL:(prevX-mouseX<0)?lionR:currImg;
  image(currImg,mouseX,mouseY);
  prevX=mouseX;
}
