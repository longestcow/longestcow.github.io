// Wave Function Collapse
// Om Iyer
// 30 Oct 2023

p5.disableFriendlyErrors = true;

const c = 2000; //canvas size
const s = 20; // tile count per row
let grid;
let scl = c/s;

let images = [];

const dirs = [
  [111,111,111,111], // blank sides
  [121,121,111,121], // up sides
  [121,121,121,111], // right sides
  [111,121,121,121], // down sides
  [121,111,121,121] // left sides
];

let start;

function preload(){
  images[0]=loadImage("blank.jpg");
  images[1]=loadImage("dir.jpg");
  images[2]=images[1];
  images[3]=images[1];
  images[4]=images[1];
}


function setup() {
  for(let image of images) image.resize(0,scl);
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
  loop();
}

//function draw() {}

function draw(){
  // getting smallest entropy tiles - got the sorting idea from TheCodingTrain
  let gridCopy = [];
  for(let i = 0; i<s; i++)
    for(let j = 0; j<s; j++)
      gridCopy=gridCopy.concat(grid[i][j]);
  //now gridCopy has all tiles in one single row
  gridCopy=gridCopy.filter((tile)=>{//remove all collapsed tiles
    return !(tile.collapsed);
  });
  gridCopy.sort((a,b)=>{
    return a.options.length - b.options.length; // if a is smaller than b, it will return a negative value, thus letting the sort know which one comes first
  });
  if(gridCopy.length===0){//all of them are collapsed
    noLoop(); 
    print("finished - "+(performance.now()-start)/1000+"s");
    return;
  }
  
  let leastEntropy = gridCopy[0].options.length;

  let tile=random(gridCopy.filter((tile)=>{
    return tile.options.length === leastEntropy;
  }));
  
  tile.collapse();

}


class Tile{

  constructor(x, y){
    this.sockets;//[["121"],["121"],["111"],["121"]]
    this.x = x;
    this.y = y;
    this.collapsed=false;
    this.options = [0,1,2,3,4];
    this.rot;
  }


  draw(){
    if(this.collapsed){
      push();
      translate(this.x+scl/2,this.y+scl/2);
      rotate((HALF_PI)*this.rot);
      image(images[this.options[0]], -scl/2, -scl/2);
      pop();
    }
    else
      image(images[0], this.x, this.y); 
  }

  collapse(){//update neighbours
    let pick = random(this.options);
    if(pick===undefined)restart();
    this.options=[pick];
    this.sockets=dirs[pick];
    this.collapsed = true;
    this.rot=(pick!==0)?pick-1:0;

    //update up's down, filter out any downs that are not equal to this guy's up
    let x=this.x/scl,y=this.y/scl,x1,y1;
    if(y !== 0){
      y1=this.y/scl-1;
      grid[x][y1].options = grid[x][y1].options.filter((n)=>{
        return(dirs[n][2] === dirs[pick][0]); //filter out the ones whose down are not equal to this guy's up
      });
    }

    //update right's left
    if(x !== s-1){
      x1=this.x/scl+1;
      grid[x1][y].options = grid[x1][y].options.filter((n)=>{
        return(dirs[n][3] === dirs[pick][1]); //filter out the ones whose left are not equal to this guy's right
      });
    }

    if(y !== s-1){ //update down's up
      y1=this.y/scl+1;
      grid[x][y1].options = grid[x][y1].options.filter((n)=>{
        return(dirs[n][0] === dirs[pick][2]); //filter out the ones whose up are not equal to this guy's down
      });
    }

    if(x !== 0){//update left's right
      x1=this.x/scl-1;
      grid[x1][y].options= grid[x1][y].options.filter((n)=>{
        return(dirs[n][1] === dirs[pick][3]); //filter out the ones whose left are not equal to this guy's right
      });
    }

    this.draw();

  }

}

function restart(){
  noLoop();
  print("couldnt reach end");
  setup();
}