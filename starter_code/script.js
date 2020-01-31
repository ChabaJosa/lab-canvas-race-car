document.querySelector('#start-button').onclick = function() { //Start button is clicked 
  this.remove()  //removes start button
  startGame() //calls startGame
  moveLines()
}

// document.onclick = function(e){ // Melvin: On mouse click will give you x,y coordinates of the click
//   console.log(e.x, e.y)
// }


const canvas = document.querySelector('#canvas'); //Get the canvas

var img1 = new Image(); //load an image element
var img2 = new Image();
var img3 = new Image();
let ouch = new Audio("ouch.mp3");

canvas.width = window.innerWidth/1.5; //Set canvas width and height
canvas.height = 500

const ctx = canvas.getContext('2d'); //Get the context, Always do this

let car = {  //Car object - also can be converted to a Class //This is Toretto
  x:210,
  y:400,
  width: 80,
  height: 80
}

let dragon = {  //Car object - also can be converted to a Class //This is Toretto
  x:210,
  y:-100,
  width: 80,
  height: 80
}

let powThing = {
  x:210,
  y:-100,
  width: 80,
  height: 80
}


function startGame(){  
  console.log("START") 
  img1.onload = function() {  //Load the car for the first time 
     ctx.drawImage(img1, car.x, car.y, car.width, car.height); 
  }
  img1.src = "./images/HarryPotterC.png";


  img2.onload = function() {  //Load the car for the first time 
    ctx.drawImage(img2, dragon.x, dragon.y, dragon.width, dragon.height); 
  }
  img2.src = "./images/rotatedDragon.png";

  img3.onload = function() {  //Load the car for the first time 
    ctx.drawImage(img3, powThing.x, powThing.y, powThing.width, powThing.height); 
    }
  img3.src = "./images/pow.png";

  window.requestAnimationFrame(mainLoop) //Starts the animation infinite loop
}


function drawBoard() {
  ctx.fillStyle = '#890000'
  ctx.fillRect(0,0,canvas.width, canvas.height) //draws the green grass 
  ctx.fillStyle = 'grey'
  ctx.fillRect(100,0,canvas.width-200, canvas.height) //draws the road 
  ctx.fillStyle = 'white'
  ctx.fillRect(110,0,10, canvas.height) //draws the left sideline 
  ctx.fillStyle = 'white'
  ctx.fillRect(385,0,10, canvas.height) //draws the right sideline
}



function drawCar() {
  ctx.drawImage(img1, car.x, car.y, car.width, car.height); //draws the car depending on the coords in the obj above 
}

function drawdragon(){
  ctx.drawImage(img2, dragon.x, dragon.y, dragon.width, dragon.height);
}

function drawdPow(){
  ctx.drawImage(img3, powThing.x, powThing.y, powThing.width, powThing.height);
}


document.onkeydown = function(e) { //controls -- up down left and right ... 
  switch (e.keyCode) { //changes the car object 
    case 38: car.y-=10;    console.log('up', e); break; // Every number after case is keycode for each key
    case 40: car.y+=10;  console.log('down',e); break;
    case 37: car.x-=10;  console.log('left',e); break;
    case 39: car.x+=10; console.log('right',e); break;
  }
  
}


function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


let lines = []

function moveLines() {
  
  setInterval(()=>{
    let line = {
      x:250,
      y:-50,
      width: 10,
      height: 50
    }

    lines.push(line)
  }, 1000)
  
  }

function drawline () {

  lines.forEach(line => {
    // console.log(line)
    ctx.fillStyle = 'white'
    ctx.fillRect(line.x,line.y++,line.width,line.height)
  })
}

function stop () {
  window.cancelAnimationFrame(frameID)
  drawBoard()
}

let count = 0
let goodScore = 0
let badScore = 0
let collision = false; 
let frameID;

function mainLoop (){
  count += 1

  frameID = window.requestAnimationFrame(mainLoop) //continues the loop
  
  ctx.clearRect(0,0,canvas.width, canvas.height) //clears the whole canvas, the car, the board everything in the canvas
  
  if (car.x!=210 || car.y!=400){
    
    if (count%10==0){
  
      dragon.y += 10
      dragon.x += getRandomArbitrary(20,-20)
      // console.log(dragon.x,dragon.y)

      if (car.x < 100){ //car has hit left grass 
        car.x=100
      }

      if (car.x > canvas.width - car.width){ // car has hit right grass // But this isn't working
        car.x = canvas.width - car.width
      }

      if (car.x < dragon.x + dragon.width &&
        car.x + car.width > dragon.x &&
        car.y < dragon.y + dragon.height &&
        car.y + car.height > dragon.y) {
        // console.log(powThing,car)
         powThing.x = car.x
         powThing.y = car.y
         powThing.height = 150
         powThing.width= 150
         ouch.play()
         badScore+=1
          
         collision = true;

     } else {
         collision = false;
     }
      
    if (dragon.y>canvas.height || dragon.x>375 || dragon.x<120){
      goodScore += 1
      // console.log(goodScore)
      dragon.y= 0
      dragon.x=210
      dragon.height+= 5
      dragon.width+= 5
    }
    
  }
  

  }

  if(badScore>4){
    stop ()
  }
  
  
  drawBoard()  //redraws the board over and over and over again
  drawline()  //Draws lines
  drawCar()   //redraws the car over and over and over again
  drawdragon()
  if(collision){
    drawdPow ()
  }
  

}

/* Things to add:

Lives counter;
score counter;
harry potter powers;
various dragons;

*/