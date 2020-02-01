// Logs Start, 
// creates an event where onload empty image variables are assigned images and are drawn based on obj properties, 
// starts the animation infinite loop
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

// Draws the background
function drawBoard() {
  ctx.fillStyle = '#890000'
  ctx.fillRect(0,0,canvas.width, canvas.height) //draws the green grass 
  ctx.fillStyle = 'grey'
  ctx.fillRect(canvas.width*0.13,0,canvas.width*0.75, canvas.height) //draws the road, it's /8 because x
  ctx.fillStyle = 'white'
  ctx.fillRect(canvas.width*0.14,0,10, canvas.height) //draws the left sideline 
  ctx.fillStyle = 'white'
  ctx.fillRect(canvas.width*0.86,0,10, canvas.height) //draws the right sideline, x is 86% of the canvas width
}

// Draws car/HP based on obj properties 
function drawCar() {
  ctx.drawImage(img1, car.x, car.y, car.width, car.height); //draws the car depending on the coords in the obj above 
}

// Draws dragon based on obj properties 
function drawdragon(){
  ctx.drawImage(img2, dragon.x, dragon.y, dragon.width, dragon.height);
}

// Draws Pow! based on obj properties 
function drawdPow(){
  ctx.drawImage(img3, powThing.x, powThing.y, powThing.width, powThing.height);
}

// Creates random number between min and max
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Pushes line (obj) every #### miliseconds to the lines [] array
function moveLines() {
  
  setInterval(()=>{
    let line = {
      x:canvas.width/2,
      y:-50,
      width: 10,
      height: 50
    }

    lines.push(line)
  }, 300)
  
}

// Loops through each line in the line array and draws it based on the properties set in the previous function
// Increases Y so I can constatntly go down
function drawline () {

  lines.forEach(line => {
    // console.log(line)
    ctx.fillStyle = 'white'
    ctx.fillRect(line.x,line.y+=10,line.width,line.height)
  })
}


// Stops the infinite loop
// Draws final iteration of the board
function stop () {
  window.cancelAnimationFrame(frameID)
  drawBoard()
}

// Main loop function
function mainLoop (){
  count += 1

  // Sets every frame which is painted over and over in the infinite loop by calling the function
  frameID = window.requestAnimationFrame(mainLoop) 
  
  // clears the whole canvas, the car, the board everything in the canvas
  ctx.clearRect(0,0,canvas.width, canvas.height) 
  
  // If car/HP moves then all the other conditions start
  if (car.x!=canvas.width/2 || car.y!=canvas.height-50){ 
    
    if (count%10==0){
  
      dragon.y += 10
      dragon.x += getRandomArbitrary(20,-20)
      // console.log(dragon.x,dragon.y)

      // Prevents the car from getting to the left side grass
      if (car.x < 100){ 
        console.log("sup")
        car.x=100
      }

      // Prevents the car from getting to the right side grass // But this isn't working
      if (car.x > canvas.width - car.width){ 
        car.x = canvas.width - car.width
      }

      // If all of these are true then there's a collision
      if (car.x < dragon.x + dragon.width &&
        car.x + car.width > dragon.x &&
        car.y < dragon.y + dragon.height &&
        car.y + car.height > dragon.y) {  
        // Gives pow thing the right properties      
         powThing.x = car.x               
         powThing.y = car.y
         powThing.height = 150
         powThing.width= 150
        // plays ouch 
         ouch.play()
        // Adds to bad score                      
         badScore+=1    
        // Sets collision to true, which intiates drawPow() later on                  
         collision = true;                

     } else {
        // Sets collision back to false, once it's no longer coliiding
         collision = false;               
     }
    
    // If dragon gets out of the road
    if (dragon.y>canvas.height || dragon.x>375 || dragon.x<120){ 
      // Adds to goodScore
      goodScore += 1                                             
      // console.log(goodScore)

      // Starts at the beginning
      dragon.y= 0                  
      dragon.x=210
      dragon.height+= 10
      dragon.width+= 10
    }
    
  }

  }

  // redraws the background over and over and over again
  drawBoard()  

  // redraws lines     
  drawline()

  // redraws the car over and over and over again        
  drawCar()   
  
  // redraws dragon
  drawdragon()

  // Draws pow when collision
  if(collision){    
    drawdPow ()
  }

  // Stops game if badScore if over #
  if(badScore>10){  
    stop ()
  }
  

}