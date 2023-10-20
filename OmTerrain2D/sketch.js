// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let _size,noiseValue,x,y,inc=0.1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  _size=createSlider(6,30,10,1); // Slider for rectangle size
  _size.position(0,height-(height/15));

  inc=createSlider(0.01,0.5,0.1,0.01); // Slider for rectangle size
  inc.position(0,height-(height/15)*2);
  noStroke();
  textSize(20);
}

function draw() {
  x=0;
  for(let i = 0; i<width; i+=_size.value()){
    y=0;
    x+=inc.value();
    for(let j = 0; j<height;j+=_size.value()) {
      y+=inc.value();
      noiseValue=noise(x,y);
      if(noiseValue*100>40) fill(0,noiseValue*255,0);
      else fill(0,0,noiseValue*255*2);
      rect(i,j,_size.value(),_size.value());
    }
  }
  fill(255,0,0);
  text('Noise Increment ('+inc.value()+')', inc.width+15,inc.y+15);
  text('Rect Width ('+_size.value()+')', _size.width+15,_size.y+15);
}
