//Gets the canvas
const canvas = document.querySelector('#canvas'); 

//Gets the context (Always do this)
const ctx = canvas.getContext('2d'); 

// Set canvas width to 2/3 of the screen windows width
canvas.width = window.innerWidth/1.5; 

// Set canvas height
canvas.height = window.innerWidth*0.5                

//Start button is clicked 
document.querySelector('#start-button').onclick = function() { 
  this.remove()   //removes start button
  startGame()     //calls startGame
  moveLines()
}

//load an image element
var img1 = new Image();               
var img2 = new Image();
var img3 = new Image();

//load an audio element
let ouch = new Audio("./sounds/ouch.mp3");     
let dragonSound = new Audio("./sounds/dragon.mp3")

//controls -- up down left and right
document.onkeydown = function(e) {    

  //changes the car object 
  switch (e.keyCode) {                
    // Every number after case is keycode for each key
    case 38: car.y-=10;    console.log('up', e); break; 
    case 40: car.y+=10;  console.log('down',e); break;
    case 37: car.x-=10;  console.log('left',e); break;
    case 39: car.x+=10; console.log('right',e); break;
  }                                   
  
}

// array of middle pushed with the moveLines() function
let lines = []      
   
// This is every frame shown
let frameID;    

let count = 0
let goodScore = 0
let badScore = 0
let collision = false; 

// document.onclick = function(e){ // Melvin: On mouse click will give you x,y coordinates of the click
//   console.log(e.x, e.y)
// }

/* Things to add:

Lives counter;
score counter;
harry potter powers;
various dragons;
Game over message;

*/