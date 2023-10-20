// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let eastBound=[], westBound=[];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for(let i = 0; i < 20; i++){
    eastBound.push(new Vehicle(round(random(0,1)), [random(0,256),random(0,256),random(0,256)], width, random(height/4, height/2.1), -1, random(0.2, 15)));
  }
  for(let i = 0; i < 20; i++){
    eastBound.push(new Vehicle(round(random(0,1)), [random(0,256),random(0,256),random(0,256)], 0, random(height/1.9,(height/4)*3), 1, random(0.2, 15)));
  }
}

function draw() {
  background(220);
  drawRoad();
  rectMode(CENTER);
  for(let i of eastBound) i.action();
  for(let i of westBound) i.action();

}


function drawRoad(){
  rectMode(CORNERS);
  fill(0);
  rect(0,height/4,width,(height/4)*3);
  fill(240);
  for(let i = 0; i<width; i+=width/20){
    rect(i,height/2+4,i+width/35,height/2-4);
  }
}

class Vehicle {
  
  constructor(type, color, x, y, dir, spe){
    this.type=type; 
    this.color=color;
    this.x=x;
    this.y=y;
    this.dir=dir;
    this.spe=spe;
  }
  
  action(){
    this.move();
    this.speedUp();
    this.speedDown();
    this.changeColor();
    this.display();
  }

  display(){
    fill(this.color[0], this.color[1], this.color[2]);
    if(this.type===0){
      rect(this.x, this.y, 40, 15);
      fill(255);
      rect(this.x-13, this.y-7.5, 7, 3);
      rect(this.x+13, this.y+7.5, 7, 3);
      rect(this.x-13, this.y+7.5, 7, 3);
      rect(this.x+13, this.y-7.5, 7, 3);
    }
    else{
      rect(this.x, this.y, 30, 20);
      line(this.x+this.dir*15, this.y+5, this.x+this.dir*15, this.y-5);
    }
  }

  move(){
    this.x+=this.spe;
    if(this.dir===1 && this.x>width)this.x=0;
    else if(this.dir===-1 && this.x<0)this.x=width;
  }

  speedUp(){
    if(round(random(1,100))!==1) return;
    this.spe+=1;
    if(this.spe>15)this.spe=15;
  }
  speedDown(){
    if(round(random(1,100))!==1) return;
    this.spe-=1;
    if(this.spe<0.2)this.spe=0.2;
  }
  changeColor(){
    if(round(random(1,100))!==1) return;
    this.color=[random(0,256),random(0,256),random(0,256)];
  }

}