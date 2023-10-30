// Wave Function Collapse
// Om Iyer
// 30 Oct 2023


const c = 400; //canvas size

const d = 4;
let grid;

let scl = c/d;
let images = [];

function preload(){
  images[0]=loadImage("blank.jpg");
  images[1]=loadImage("dir.jpg");
  for(let image of images) image.resize(0,scl);
}


function setup() {
  grid=new Array(d);
  //fill grid
  for(let i = 0; i<d; i++){
    grid[i]=new Array(d);
    for(let j = 0; j<d; j++){
      grid[i][j]=new Tile(images[0], ["111","111","111","111"], i, j, 0);
    }
  }

  noFill();
  strokeWeight(10);
  imageMode(CENTER);
  rectMode(CENTER);
  createCanvas(c, c);

}

function draw() {
  for(let i = 0; i<d; i++){
    for(let j = 0; j<d; j++){
      grid[i][j].draw();
    }
  }
  noLoop();
}


class Tile{

  constructor(img, sockets, x, y, rot){
    this.img=img;
    this.sockets=sockets;//[["121"],["121"],["111"],["121"]]
    this.x = x;
    this.y = y;
    this.collapsed=false;
    this.options = [];
    this.rot=rot;
  }

  rotateTile(x,y){
    //return new tile object with rotated image and sockets
    let nSocket = this.sockets.slice();
    let temp = nSocket[0];
    nSocket[0]=nSocket[3];
    nSocket[3]=temp;

    return new Tile(this.img, nSocket, x, y, (this.rot+1)%4);
  }

  draw(){
    //rotation
    push();
    translate(this.x,this.y);
    rotate((HALF_PI)*this.rot);
    image(this.img, 0, 0, 300,300);
    rect(0,0,this.img.width, this.img.height);
    pop();
  }
}