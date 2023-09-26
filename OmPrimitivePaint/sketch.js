// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
 

// a(rectangle) s(ellipse) d(triangle)
let shape="a", col, _size=50, clicked=false;

// moving shape
let autoSize=0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function draw() {
  //user shapes
  if(clicked){
    col = color(random(256),random(256),random(256));
    fill(col);
    print(shape);
    if(shape==="a"){
      rect(mouseX-_size/2,mouseY-_size/2,_size,_size);
    }
    else if(shape==="s"){
      ellipse(mouseX,mouseY,_size,_size);
    }
    else{
      triangle(mouseX-(_size/2), mouseY+(_size/2),
        mouseX+(_size/2), mouseY+(_size/2), 
        mouseX, mouseY-_size/2);
    }
    clicked=false;
  }

  //

}

function mouseWheel(event){
  print(_size);
  if(event.delta===100 && _size-5>=0){
    _size-=5;
  }
  else if(event.delta===-100){
    _size+=5;
  }
}

function mouseClicked(){
  clicked=true;
}

function keyPressed(){
  if(key==="a"||key==="s"||key==="d"){
    shape=key;
  }
}

