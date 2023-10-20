// Terrain Generation - 1D
// Om Iyer
// 6th October 2023
//
// Extra for Experts:
//  - Added the expert challenges
//    - Flag at the peak
//    - Panning
//    - Mean average
//  - Colors and a theme
//  - Sliders to make the noise increment value, and the rectangle size changeable during runtime
//  - Checkboxes to make the expert challegne additions toggleable


// Global Variables
let _size, peak, nI, noiseValue=0;
let average, flag;

function setup() {
  createCanvas(windowWidth, windowHeight);

  _size=createSlider(1,50,5,1); // Slider for rectangle size
  _size.position(0,height-(height/15));

  nI=createSlider(0.001,0.05,0.005,0.001); // Slider for noise increment value
  nI.position(0,height-(height/15)*2);


  average=createCheckbox('Mean Average', true); // Checkbox to toggle on/off the average line
  average.position(0,height-(height/15)*3);

  flag=createCheckbox('Peak Flag', true); // Checkbox to toggle on/off the flag at the peak
  flag.position(0,height-(height/15)*4);

  rectMode(CORNERS);
  noStroke();
  peak=[width,height]; // Preset value that is to be changed

}

function draw() {
  noiseValue+=nI.value();
  generateTerrain(noiseValue);

  if(flag.checked()) // Draw the flag at the peak if flag checkbox is checked
    drawFlag(peak[0],peak[1]);

  fill(0);
  text('Noise Increment ('+nI.value()+')', nI.width+15,nI.y+15);
  text('Rect Width ('+_size.value()+')', _size.width+15,_size.y+15);
}

function generateTerrain(nLevel){
  peak=[width,height];

  let mean=0,y=0,h;
  background(9, 112, 255);//bg color

  fill(253, 255, 20);//sun color
  circle(width/2, height/3, 100);

  fill(0, 195, 20);//terrain colors
   for(let i=0; i<width; i+=_size.value(),y++){ //the y++ is here so that I have the number of rects that were drawn by the end of this loop (for the mean average)
    nLevel+=nI.value();
    h=noise(nLevel)*height;
    rect(i,height,i+_size.value(),h);
    if(h<peak[1])
      peak=[i+_size.value()/2, h];
    mean+=h;
  }

  //drawing the mean average
  if(average.checked()){
    mean/=y;
    fill(255,0,0);
    rect(0,mean+3,width,mean-3);
  }
}


//drawing the flag
function drawFlag(x, y){
  fill(0);
  rect(x,y,x+2,y-10);
  fill(255,0,0);
  triangle(x,y-20,x,y-10,x+10, y-15);
}
