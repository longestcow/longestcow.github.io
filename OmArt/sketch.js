// Art Replication - Ninety Parallel Sinusoids With Linearly Increasing Period
// Om Iyer
// 27/10/2023



let s,division;
let waveGap=4; // gap between the lines height wise
let sinHeight=20; // height of the waves
let w=500; // preset width for the image

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(1.5); // increase this for more "depth"
  drawParallelSinusoids();
}


function drawParallelSinusoids(){
  for(let i = w*0.1; i<w; i++){
    for(let j = height*0.2; j<height*0.7; j+=waveGap){
      division=map(i,w*0.1, w, 70, 22.5);//set how much the increasing factor should be divided by 
      s=sin(i/division); // get sin value based on i/division
      point(i, j+s*sinHeight); 
    }
  }
}