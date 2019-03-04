let fontRobotoMono;

function preload() {
  fontRobotoMono = loadFont('RobotoMono-Regular.ttf');
}

let string = "  welcome  ";
let correctChars = [];

function setup() {
  createCanvas(windowWidth - 15, 400);
  background(51);
  frameRate(9);

  for (let i = 0; i < string.length; i++) {
    correctChars.push(false);
  }
}

function draw() {
  background(51);

  chanceToCorrectChars();
  let randStr = randString(string);
  textFont(fontRobotoMono);
  textSize(46);
  textAlign(CENTER);
  fill(90, 200, 62);
  text(randStr, width / 2, height / 2);
}

function randString(str) {
  let randStr = [];
  for (let i = 0; i < str.length; i++) { // 33 -> 126
    randStr.push(String.fromCharCode(round(random(64, 126))));
  }
  return correctCharsInString(randStr);
}

function correctCharsInString(randStr) {
  for (let i = 0; i < randStr.length; i++) {
    if (correctChars[i])
      randStr[i] = string[i];
  }
  return (randStr.toString()).replace(/,/g, '');
}

function chanceToCorrectChars() {
  for (let i = 0; i < correctChars.length; i++) {
    if (random(1) < 0.065) {
      correctChars[i] = true;
    }
  }
}