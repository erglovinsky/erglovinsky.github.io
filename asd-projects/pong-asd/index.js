/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
   
  // Game Item Objects
  function factoryFunction(id){
    return {
        id: id,
        x: parseFloat($(id).css("left")),
        y: parseFloat($(id).css("top")),
        width: $(id).width(),
        height: $(id).height(),
        speedX: 0,
        speedY: 0,
        }
    }

    var paddleRight = factoryFunction("#paddleRight");
    var paddleLeft = factoryFunction("#paddleLeft");
    var ball = factoryFunction("#ball");


    var KEY = {
        'UP': 38,
        'DOWN': 40,
        'W': 87,
        'S': 83,
    }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);                         // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionPaddles();
    redrawPaddles();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    //right paddle movement
    if (event.which === KEY.UP) {
        paddleRight.speedY = 5;
    } else if (event.which === KEY.DOWN) {
        paddleRight.speedY = -5;
    }
    //left paddle movement
    if (event.which === KEY.W) {
        paddleLeft.speedY = 5;
    } else if (event.which === KEY.S) {
        paddleLeft.speedY = -5;
    }
  }

  function handleKeyUp(event) {
      //right paddle movement
      if (event.which === KEY.UP) {
          paddleRight.speedY = 0;
      } else if (event.which === KEY.DOWN) {
          paddleRight.speedY = 0;
      }
      //left paddle movement
      if (event.which === KEY.W) {
          paddleLeft.speedY = 0;
      } else if (event.which === KEY.S) {
          paddleLeft.speedY = 0;
      }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function repositionPaddles() {
      paddleRight.speedY += paddleRight.speedY;
      paddleLeft.speedY += paddleLeft.speedY;
  }

  function redrawPaddles() {
      $("#paddleRight").css('top', paddleRight.y);
      $("#paddleLeft").css('top', paddleLeft.y);
  }
}
