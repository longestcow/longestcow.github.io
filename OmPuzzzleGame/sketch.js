//Insert your Comment Header here.

let NUM_ROWS = 4;
let NUM_COLS = 5;
let rectWidth, rectHeight;
let hovered=[];
let gridData = [[]];
let won = [false];


function setup() {
  //fill grid
  for(let i = 0; i<NUM_ROWS; i++){
    gridData[i]=[];
    for(let j = 0; j<NUM_COLS; j++)
      gridData[i][j]=(round(random(0,2))==0);//true or false
  }
  

  // Determine the size of each square. Could use windowHeight,windowHeight  for Canvas to keep a square aspect ratio
  createCanvas(windowWidth, windowHeight);
  rectWidth = width/NUM_COLS;
  rectHeight = height/NUM_ROWS;
}

function draw() {
  if(won[0]){
    drawGrid(false);
    fill(won[1]);
    textAlign(CENTER);
    textSize(50);
    text("you win",width/2, height/2);
    noLoop();
    return;
  }
  background(220);
  determineActiveSquare();   //figure out which tile the mouse cursor is over
  drawGrid(true);                //render the current game board to the screen (and the overlay)
}



function mousePressed(){
  // cross-shaped pattern flips on a mouseclick. Boundary conditions are checked within the flip function to ensure in-bounds access for array
  if(won[0]) return;
  flip(hovered[0][1], hovered[0][0]);


  if(!(keyIsPressed === true && keyCode===SHIFT))
    for(let i of hovered.slice(1))
      flip(i[0], i[1]);
    
  
  
  if(checkForWin())
    won[0]=true;
  
  
}

function flip(row, col){
  // given a column and row for the 2D array, flip its value from 0 to 255 or 255 to 0
  // conditions ensure that the col and row given are valid and exist for the array. If not, no operations take place.
  if(checkValid(row,col))
      gridData[row][col]=!gridData[row][col];
}

function determineActiveSquare(){
  // An expression to run each frame to determine where the mouse currently is.
  hovered=[];
  let x = int(mouseX / rectWidth), y = int(mouseY / rectHeight);
  hovered.push([x,y]);
  //if type==1
  if(checkValid(x-1, y))hovered.push([x-1,y]);
  if(checkValid(x+1, y))hovered.push([x+1,y]);
  if(checkValid(x, y-1))hovered.push([x,y-1]);
  if(checkValid(x, y+1))hovered.push([x,y+1]);


}

function drawGrid(){
  // Render a grid of squares - fill color set according to data stored in the 2D array
  for (let x = 0; x < NUM_COLS ; x++){
    for (let y = 0; y < NUM_ROWS; y++){
      fill(gridData[y][x]?0:255); //change fill here for the overlay with hovered[0][0] and col
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
  if(won[0])return; //dont wanna draw the highlight when finished
  fill(125,0,0,100);
  for(let i of hovered){
    rect(i[0]*rectWidth, i[1]*rectHeight, rectWidth, rectHeight);
  }
}

function checkForWin(){
  let first = gridData[0][0];
  for(let i = 0; i< NUM_ROWS; i++)
    for(let j = 0; j<NUM_COLS; j++)
      if(gridData[i][j] !== first)return false;

  won[1]=first?255:0;
  return true;
}

function checkValid(x, y){
  if (x >= 0 && x < NUM_ROWS )
    if (y >= 0 && y < NUM_COLS)
      return true;
  
  return false;
}




