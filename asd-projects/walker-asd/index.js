/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  var positionXFish = 10;
  var positionYFish = 10;
  var positionXShark = 850;
  var positionYShark = 690;

  var sharkWidth = 150;
  var fishWidth = 70;

  var speedXFish = 0;
  var speedYFish = 0;
  var speedXShark = 0;
  var speedYShark = 0;
  
  var boardWidth = 900;
  var boardHeight = 730;

  // Game Item Objects
  var KEY = {
      'LEFT': 37,
      'UP': 38,
      'RIGHT': 39,
      'DOWN': 40,
      'A': 65,
      'W': 87,
      'D': 68,
      'S': 83,
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    //movement
    if(event.which === KEY.LEFT) {
        speedXFish = -5;
    } else if(event.which === KEY.UP) {
        speedYFish = -5;
    } else if(event.which === KEY.RIGHT) {
        speedXFish = 5;
    } else if(event.which === KEY.DOWN) {
        speedYFish = 5;
    } else if(event.which === KEY.A) {
        speedXShark = -5;
    } else if(event.which === KEY.W) {
        speedYShark = -5;
    } else if(event.which === KEY.D) {
        speedXShark = 5;
    } else if(event.which === KEY.S) {
        speedYShark = 5;
    }
    //boundary
    if(positionXFish > boardWidth) {
        positionXFish = 0;
    } else if(positionXFish < 0) {
        positionXFish = boardWidth;
    } else if(positionYFish > boardHeight) {
        positionYFish = 0;
    } else if(positionYFish < 0) {
        positionYFish = boardHeight;
    } else if (positionXShark > boardWidth) {
        positionXShark = 0;
    } else if (positionXShark < 0) {
        positionXShark = boardWidth;
    } else if (positionYShark > boardHeight) {
        positionYShark = 0;
    } else if (positionYShark < 0) {
        positionYShark = boardHeight;
    }
  }

  function handleKeyUp(event) {
    if(event.which === KEY.LEFT) {
        speedXFish = 0;
    } else if(event.which === KEY.UP) {
        speedYFish = 0;
    } else if(event.which === KEY.RIGHT) {
        speedXFish = 0;
    } else if(event.which === KEY.DOWN) {
        speedYFish = 0;
    } else if (event.which === KEY.A) {
        speedXShark = 0;
    } else if (event.which === KEY.W) {
        speedYShark = 0;
    } else if (event.which === KEY.D) {
        speedXShark = 0;
    } else if (event.which === KEY.S) {
        speedYShark = 0;
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
  
  function repositionGameItem() {
    positionXFish += speedXFish;
    positionYFish += speedYFish
    positionXShark += speedXShark;
    positionYShark += speedYShark;
  }

  function redrawGameItem () {
    $('#gameItem').css('left', positionXFish)
    $('#gameItem').css('top', positionYFish)
    $('#shark').css('left', positionXShark)
    $('#shark').css('top', positionYShark)
  }
}
