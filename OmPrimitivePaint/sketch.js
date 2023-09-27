// Primitive Paint
// Om Iyer
// 26th September
//
// Extra for Experts:
// - made it so you can preview the shape which follows the mouse, before being placed on mouse click
// - size of the shapes can be changed through mouse scroll
 

// user-made shape variables
let shape="a", _size=50, shapes=[];

// moving shape variables
let curr=0, val, reset=false, autoSize=50;

// preview variables
let col;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(50);
  textFont("Helvetica");
  col=color(random(256),random(256),random(256));
}

function draw() {
  background(220);

  drawShapes();
  drawAutonomous();
  drawMouse();

  //drawName
  fill(70);
  text("Om Iyer", 0, height);
}

function mouseWheel(event){ //Decrease/Increase _size based on scroll
  if(event.delta>0 && _size-5>=0){
    _size-=5;
  }
  else if(event.delta<0){
    _size+=5;
  }
}

function mouseClicked() { //Adds shape to the shapes list
  append(shapes,[mouseX,mouseY,_size,col,shape]);
  col=color(random(256),random(256),random(256));
}

function keyPressed(){ //Pick shape OR clear canvas
  if(key==="a"||key==="s"||key==="d"){
    shape=key;
  }
  if(key == " "){
    shapes=[];
  }
}

function drawShapes(){ //Draw all the shapes in shapes array
  stroke("black");
  for(let arr of shapes){ // arr holds all the values belonging to a shape whihc was placed
    //0=mouseX
    //1=mouseY
    //2=_size
    //3=col
    //4=shape
    fill(arr[3]);
    if(arr[4]==="a"){
      rect(arr[0]-arr[2]/2,arr[1]-arr[2]/2,arr[2],arr[2]);
    }
    else if(arr[4]==="s"){
      ellipse(arr[0],arr[1],arr[2],arr[2]);
    }
    else if(arr[4]==="d"){
      triangle(arr[0]-(arr[2]/2), arr[1]+(arr[2]/2),
        arr[0]+(arr[2]/2), arr[1]+(arr[2]/2), 
        arr[0], arr[1]-arr[2]/2);
    }
  }
}

function drawAutonomous() { // draws the boundary-like rect moving thing i dont know what to call it
  noStroke();
  val=map(millis()%1000, 0, 1000, 0, 1);
  if(curr==0)
    rect(0,0,width*val,autoSize);
  else if(curr==1)
    rect(width-autoSize,0,autoSize,height*val)
  else if(curr==2)
    rect(width,height-autoSize,-width*val,autoSize);
  else if(curr==3)
    rect(0,height,autoSize,-height*val);

  if(val>0.98 && !reset){
    curr+=1;
    curr%=4;
    reset=true;
  }
  if(val<0.1)reset=false; // this was done in order to fix a bug where the rect axis didn't get updated (curr+=1 wasnt called)
}

function drawMouse() { // draws the preview shape based on mouse position and shape size
  fill(col);
  if(shape==="a"){
    rect(mouseX-_size/2,mouseY-_size/2,_size,_size);
  }
  else if(shape==="s"){
    ellipse(mouseX,mouseY,_size,_size);
  }
  else if(shape==="d"){
    triangle(mouseX-(_size/2), mouseY+(_size/2),
      mouseX+(_size/2), mouseY+(_size/2), 
      mouseX, mouseY-_size/2);
  }
}

