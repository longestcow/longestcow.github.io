
let cellSize=200, breakSize=20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(24);
  drawBoard(true,0,0);
}

function drawBoard(mainBoard, cX, cY){
  rectMode(CENTER);

  if(mainBoard){
    fill(254,71,115);
    rect(width/2, height/2, (cellSize-cellSize/breakSize)*3, (cellSize-cellSize/breakSize)*3);
    fill(24);
    for(let i = -1; i<2; i++){
      for(let j = -1; j<2; j++){
        rect((width/2)+i*cellSize, (height/2)+j*cellSize, cellSize-cellSize/breakSize,cellSize-cellSize/breakSize);
      }
    }
  }
  
}
