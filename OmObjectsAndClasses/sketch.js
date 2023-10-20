// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let r1,r2,r3;
function setup() {
  createCanvas(windowWidth, windowHeight);
  r1=RoundRacer((height/3)*1, 50);
  r2=RoundRacer((height/3)*2, 100);
  r3=RoundRacer((height/3)*3, 200);
}

function draw() {
  background(0);
  r1.move(); r1.display();
  r2.move(); r2.display();
  r3.move(); r3.display();

}

class RoundRacer{
  constructor(yPos, color){
    this.yPos=yPos;
    this.color=color;
    this.xPos=0;
    this.speed=random(3,15+1);
  }

  move(){
    this.xPos+=this.speed;
    if(this.xPos>width)
      this.xPos=0;
  }
  display(){
    fill(this.color);
    circle(this.xPos, this.yPos);
  }
}
