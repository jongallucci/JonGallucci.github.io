var fontRobotoMono;

var salutation = "  welcome  ";
var correctChars = [];

function getCanvasHeightInPx(){
  const heightRem = 30;
  const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return heightRem * remInPx;
}

// create canvas and set basic fields
function setup() {
  var canvas = createCanvas(windowWidth - 15, getCanvasHeightInPx());
  background(51);
  frameRate(8);
  canvas.parent("welcome-sketch");

  // make a bool array for 
  for (var i = 0; i < salutation.length; i++) {
    correctChars.push(false);
  }
}

// used as cut off for unscrammbling salutation and begin printing intro
var counter = 0;
var numLettersToDisplay = 1;
function draw() {
  background(40);

  chanceToCorrectChars();
  var randStr = randString(salutation);

  // basic settings
  textFont("Roboto Mono");
  textSize(getCanvasHeightInPx() / 3);
  textAlign(CENTER);
  fill(90, 200, 62);
  text(randStr, width / 2, height / 2);

  if (counter > 30) {

    // blinky effect of cursor
    var intro = "to my manpage ";
    if (counter % 4 == 0)
      intro = "to my manpage_";

    // prints out intro string
    if (counter < intro.length + 30) {
      whitespace = "              ".substring(0, intro.length - numLettersToDisplay - 1)
      intro = intro.substring(0, numLettersToDisplay)
      intro = intro + "_" + whitespace
      numLettersToDisplay++;
    }


    textSize(getCanvasHeightInPx() / 4.28571428571);
    text(intro, width / 2, height / 2 + getCanvasHeightInPx() / 3);
  }
}

// provides random chars
function randString(str) {
  var randStr = [];
  for (var i = 0; i < str.length; i++) {
    randStr.push(String.fromCharCode(round(random(64, 126))));
  }
  return correctCharsInString(randStr);
}

// corrects random chars in salutation string
function correctCharsInString(randStr) {
  counter++;
  for (var i = 0; i < randStr.length; i++) {
    if (correctChars[i] || counter > 28)
      randStr[i] = salutation[i];
  }
  return (randStr.toString()).replace(/,/g, '');
}

// has a chance to turn into correct char instead of random char
function chanceToCorrectChars() {
  for (var i = 0; i < correctChars.length; i++) {
    if (random(1) < 0.08) {
      correctChars[i] = true;
    }
  }
}

// Resizes the canvas window
function windowResized() {
  resizeCanvas(windowWidth - 15, getCanvasHeightInPx());
}