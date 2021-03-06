const salutation = '  welcome  ';
const correctChars = [];

function getCanvasHeightInPx() {
  const heightRem = 20;
  const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return heightRem * remInPx;
}

// create canvas and set basic fields
function setup() {
  const canvas = createCanvas(windowWidth - 15, windowHeight * 0.4);
  background(29, 31, 29);
  frameRate(14);
  canvas.parent('welcome-sketch');

  // make a bool array for
  for (let i = 0; i < salutation.length; i++) {
    correctChars.push(false);
  }
}

// used as cut off for unscrammbling salutation and begin printing intro
let counter = 0;
let numLettersToDisplay = 1;
function draw() {
  background(29, 31, 29);

  chanceToCorrectChars();
  const randStr = randString(salutation);

  // basic settings
  textFont('Roboto Mono');
  textSize(min((height / 4), (width / 10)));
  textAlign(CENTER);
  fill(90, 200, 62);
  text(randStr, width / 2, height / 2);

  if (counter > 26) {
    // blinky effect of cursor

    let intro = 'to my manpage ';
    if (counter % 4 === 0) {
      intro = 'to my manpage_';
    }


    // prints out intro string
    if (counter < intro.length + 26) {
      whitespace = '              '.substring(0, intro.length - numLettersToDisplay - 1);
      intro = intro.substring(0, numLettersToDisplay);
      intro = intro + '_' + whitespace;
      numLettersToDisplay++;
    }


    textSize(min((height / 8), (width / 14)));
    text(intro, width / 2, height / 2 + height / 5);
  }
}

// provides random chars
function randString(str) {
  const randStr = [];
  for (let i = 0; i < str.length; i++) {
    randStr.push(String.fromCharCode(round(random(64, 126))));
  }
  return correctCharsInString(randStr);
}

// corrects random chars in salutation string
function correctCharsInString(randStr) {
  counter++;
  for (let i = 0; i < randStr.length; i++) {
    if (correctChars[i] || counter > 25) {
      randStr[i] = salutation[i];
    }
  }
  return (randStr.toString()).replace(/,/g, '');
}

// has a chance to turn into correct char instead of random char
function chanceToCorrectChars() {
  for (let i = 0; i < correctChars.length; i++) {
    if (random(1) < 0.07) {
      correctChars[i] = true;
    }
  }
}

// Resizes the canvas window
function windowResized() {
  resizeCanvas(windowWidth - 15, getCanvasHeightInPx());
}
