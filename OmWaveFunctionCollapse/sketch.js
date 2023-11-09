// Wave Function Collapse
// Om Iyer
// 30 Oct 2023


const c = 700; //canvas size
const s = 7; // tile count per row
const d = 2; //number of canvases
let grid,fullCanvas;
let scl = c/d/s;

let images;
let start,count=0;

let currCell = [0,0];


const dirs = [
  [[111,112,221,111],[111,112,222,211],[111,112,222,211],[111,112,222,211],[111,111,122,211],[111,111,111,111]],//row 1
  [[122,223,331,111],[222,222,223,322],[222,222,222,222],[222,222,222,222],[221,122,222,222],[111,111,122,221]],//row 2
  [[133,331,111,111],[322,233,311,133],[222,233,333,332],[222,233,333,332],[222,233,333,332],[221,111,133,332]],//row 3
  [[111,111,111,111],[113,311,111,111],[333,311,111,113],[333,311,111,113],[333,311,111,113],[331,111,111,113]]//row 4
];


function preload(){
  images=new Array(4);
  for(let i = 1; i<=4; i++){
    images[i-1]=new Array(6);
    for(let j = 1; j<=6; j++){
      images[i-1][j-1]=loadImage("images/row-"+i+"-column-"+j+".jpg");
    }
  }
}


function setup() { 
  fullCanvas=new Array(d);
  for(let i of fullCanvas)fullCanvas[i]=new Array(d);

  for(let row of images) for(let image of row)image.resize(0,scl);

  grid=new Array(s);
  //fill grid
  for(let i = 0; i<s; i++){
    grid[i]=new Array(s);
    for(let j = 0; j<s; j++){
      grid[i][j]=new Tile(i*scl, j*scl);
    }
  }

  createCanvas(c, c);

  for(let i = 0; i<s; i++){
    for(let j = 0; j<s; j++){
      grid[i][j].draw();
    }
  }
  start=performance.now();
}



//function draw() {}

function draw(){
  // getting smallest entropy tiles - got the sorting idea from TheCodingTrain
  let gridCopy = [];
  for(let i = 0; i<s; i++)
    for(let j = 0; j<s; j++)
      gridCopy=gridCopy.concat(grid[i][j]);
  //now gridCopy has all tiles in one single row
  gridCopy=gridCopy.filter((tile)=>{
    return (!tile.collapsed)
  });
  gridCopy.sort((a,b)=>{
    return a.options.length - b.options.length; // if a is smaller than b, it will return a negative value, thus letting the sort know which one comes first
  });
  if(gridCopy.length===0){//all of them are collapsed
    noLoop();  // next grid
    print("finished - "+(performance.now()-start)/1000+"s");
    return;
  }
  
  let leastEntropy = gridCopy[0].options.length;

  let tile=random(gridCopy.filter((tile)=>{
    return (tile.options.length === leastEntropy);
  }));
  
  tile.collapse();
  print(gridCopy);
}

// function mousePressed(){
//   loop();
// }


class Tile{

  constructor(x, y){
    this.sockets;
    this.x = x;
    this.y = y;
    this.collapsed=false;
    let arr = [], k = 0;
    for(let i = 0; i<4; i++)
      for(let j = 0; j<6; j++, k++)
        arr[k]=[i,j];
        

    this.options = arr; //starts off with all possibilities
  }


  draw(){
    if(this.collapsed)
      image(images[this.options[0][0]][this.options[0][1]], this.x, this.y);
    else
      image(images[0][5], this.x, this.y); 
  }

  collapse(){//update neighbours
    let pick = random(this.options);
    if(pick===undefined)restart(this); //no options left
    this.options=[pick];
    this.sockets=dirs[pick[0]][pick[1]];
    this.collapsed = true;

    // update up's down
    let x=this.x/scl,y=this.y/scl,x1,y1;
    if(y !== 0){
      y1=this.y/scl-1;
      grid[x][y1].options = grid[x][y1].options.filter((n)=>{
        return(reverseInt(dirs[n[0]][n[1]][2]) === dirs[pick[0]][pick[1]][0]); //filter out the ones whose down are not equal to this guy's up
      });
    }

    //update right's left
    if(x !== s-1){
      x1=this.x/scl+1;
      grid[x1][y].options = grid[x1][y].options.filter((n)=>{
        return(reverseInt(dirs[n[0]][n[1]][3]) === dirs[pick[0]][pick[1]][1]); //filter out the ones whose left are not equal to this guy's right
      });
    }

    if(y !== s-1){ //update down's up
      y1=this.y/scl+1;
      grid[x][y1].options = grid[x][y1].options.filter((n)=>{
        return(reverseInt(dirs[n[0]][n[1]][0]) === dirs[pick[0]][pick[1]][2]); //filter out the ones whose up are not equal to this guy's down
      });
    }

    if(x !== 0){//update left's right
      x1=this.x/scl-1;
      grid[x1][y].options= grid[x1][y].options.filter((n)=>{
        return(reverseInt(dirs[n[0]][n[1]][1]) === dirs[pick[0]][pick[1]][3]); //filter out the ones whose left are not equal to this guy's right
      });
    }

    this.draw();

  }

}

function restart(tile){
  noLoop();
  print("couldnt reach end "+tile.x+","+tile.y);
  print(grid);
  grid=new Array(s);
  //fill grid
  for(let i = 0; i<s; i++){
    grid[i]=new Array(s);
    for(let j = 0; j<s; j++){
      grid[i][j]=new Tile(i*scl, j*scl);
    }
  }


  for(let i = 0; i<s; i++){
    for(let j = 0; j<s; j++){
      grid[i][j].draw();
    }
  }
  start=performance.now();
  loop();
}

function reverseInt(n){//faster than the built in array function apparently
  let d, a = 0;

  while(n){
    d = n % 10;
    a = (a*10) + d;
    n = n/10|0; //ignore decimal completely
  }  

  return a;
}