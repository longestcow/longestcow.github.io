// Cars
// Om Iyer
// 23/10/2023
//
// Extra for Experts:
// - Traffic Light and ability to add cars during runtime
let eastBound=[], westBound=[]; //list of all cars
let trafficLight; //global traffic light
function setup() {
  createCanvas(windowWidth, windowHeight);
  trafficLight=new TrafficLight();
  noStroke();
  for(let i = 0; i < 20; i++){
    eastBound.push(new Vehicle(round(random(0,1)), //type
    [random(0,256),random(0,256),random(0,256)], //color 
    width, //x
    random(height/4, height/2.1), //y 
    -1, //direction
    random(0.2, 15))); //speed
  }
  for(let i = 0; i < 20; i++){
    westBound.push(new Vehicle(round(random(0,1)), //type
    [random(0,256),random(0,256),random(0,256)],//color
    0,//x
    random(height/1.9, (height/4)*3), //y 
    1, //direction
    random(0.2, 15))); //speed
  }
}

function draw() {
  background(220);
  drawRoad();
  rectMode(CENTER);
  for(let i of eastBound) i.action();
  for(let i of westBound) i.action();
  trafficLight.action();
}


function drawRoad(){
  rectMode(CORNERS);
  fill(0);
  rect(0,height/4,width, (height/4)*3);//draw road
  fill(255, 170, 0);
  for(let i = 0; i<width; i+=width/20){ //draw road lines
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
    this.spe=spe*this.dir;
  }
  
  action(){
    if(trafficLight.count===0){
      this.move();
      this.speedUp();
      this.speedDown();
      this.changeColor();
    }
    this.display();//display even if red light
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
      if(this.dir===1)
        triangle(this.x-20,this.y-10, this.x-20, this.y+10, this.x+20, this.y);
      else
        triangle(this.x+20,this.y-10, this.x+20, this.y+10, this.x-20, this.y);

    }
  }

  move(){

    //bounds 0 - 15 || -15 - 0
    //keep speed in bounds
    if(this.spe>15)this.spe=15;
    if(this.spe<-15)this.spe=-15;

    if(this.dir===1 && this.spe<0.1)this.spe=0.1;
    if(this.dir===-1 && this.spe>-0.1)this.spe=-0.1;


    this.x+=this.spe;

    //reset pos
    if(this.dir===1 && this.x>width)this.x=0;
    else if(this.dir===-1 && this.x<0)this.x=width;
  }

  speedUp(){
    if(round(random(1,100))!==1) return;
    this.spe+=(this.dir===1)?1:-1;
  }
  speedDown(){
    if(round(random(1,100))!==1) return;
    this.spe-=(this.dir===1)?1:-1;
  }
  changeColor(){
    if(round(random(1,100))!==1) return;
    this.color=[random(0,256),random(0,256),random(0,256)];
  }

}

class TrafficLight {
  constructor(){
    this.count=0;
  }

  action(){
    if(keyIsPressed && key===" "){ //a key is currently pressed and it is space
      this.count=120;
    }
    this.count=max(this.count-1, 0);

    this.display();
  }

  display(){ //display traffic light
    fill(40);
    rect(width/2, height/8, width/6, height/4);
   
    fill(255,0,0,(this.count>0)?240:40);
    circle(width/2, height/16, width/10);

    fill(0,240,0,(this.count===0)?240:40);
    circle(width/2, (height/16)*3, width/10);
  }

  
}

function mouseClicked(){ // if shift, add to westBound, if not, add to eastBound
  if(keyIsDown(SHIFT))
    westBound.push(new Vehicle(round(random(0,1)), [random(0,256),random(0,256),random(0,256)], 0, random(height/1.9, (height/4)*3), 1, random(0.2, 15)));
  else
    eastBound.push(new Vehicle(round(random(0,1)), [random(0,256),random(0,256),random(0,256)], width, random(height/4, height/2.1), -1, random(0.2, 15)));
}

