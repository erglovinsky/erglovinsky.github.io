/* global $, sessionStorage */

$(document).ready(startGame); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function startGame(){
    $('#button').on('click', runProgram); // starts the program when the start game button is pressed
}

function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // factory function for creating objects for game items
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

    // Game Item Objects

    // variable declarations for game item objects
    var paddleRight = factoryFunction("#paddleRight");
    var paddleLeft = factoryFunction("#paddleLeft");
    var ball = factoryFunction("#ball");
    var board = factoryFunction("#board");

    // object for registering keycodes
    var KEY = {
        'UP': 38,
        'DOWN': 40,
        'W': 87,
        'S': 83,
    }
 
    // object for storing the score for each player
    var score = {
        "right": 0,
        "left": 0,
    }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);                         // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);
  $('#button').on('click', ballStart)

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  $('#button').hide(); // hides the start game buttom when the game starts
  $('#gameOver').hide(); // hides the game over message when the game starts (necessary if players are restarting)
  
  // sets the scores to 0 on the screen (necessary if players are restarting)
  $('#scoreRight').text(0);
  $('#scoreLeft').text(0);

  // starts the ball moving in a random direction when the game starts
  ballStart();

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
 function newFrame() {
    moveRightPaddle();
    moveLeftPaddle();
    moveBall();
    if (doCollide(paddleLeft, ball) ||
        doCollide(paddleRight, ball)) { // handles collision between ball and paddles
        ball.speedX = -ball.speedX;
        if(Math.random() < 0.5) { // randomizes the y direction of the ball when it collides with the paddle
            ball.speedY = randomSpeed(4);
        } else {
            ball.speedY = randomSpeed(-4);
        }
    } else if ((doCollide(ball, board) === false) && //handles collision between ball and bottom board boundary
               (ball.y + ball.height > board.height)) {
        ball.speedY = -ball.speedY;
    } else if ((doCollide(ball, board) === false) && //handles collision between ball and top board boundary
               (ball.y < 0)) {
        ball.speedY = -ball.speedY;
    } else if((paddleLeft.y + paddleLeft.height > board.height) || (paddleLeft.y < 0)) { //handles collision between left paddle and board boundary
        paddleLeft.speedY = 0;
    } else if ((paddleRight.y + paddleRight.height > board.height) || (paddleRight.y < 0)){ // handles collision between right paddle and board boundary
        paddleRight.speedY = 0;
    } else if ((doCollide(ball, board) === false) && //handles collision between ball and the right side of the board (when points are earned)
               (ball.x > board.width)) {
        let id = "#scoreLeft";
        score.left = score.left + 1 // increases score of left player by 1
        pointEarned(id,score.left); // updates the score display of left player
        setTimeout(ballStart, 2000); // waits 2 seconds then starts the ball randomly
    } else if ((doCollide(ball, board) === false) && //handles collision between ball and the left side of the board (when points are earned)
               (ball.x < board.x)) {
        let id = "#scoreRight"
        score.right = score.right + 1 // increases score of right player by 1
        pointEarned(id,score.right); // updates the score display of right player
        setTimeout(ballStart, 2000); // waits 2 seconds then startss the ball randomly
    } else if (score.left === 11) { //ends the game if left player earns 11 points
        let winner = "Left player"
        endGame(winner);
    } else if (score.right === 11) { //ends the game if right player earns 11 points
        let winner = "Right player"
        endGame(winner);
    }
  }

  /* Called in response to events. */
  function handleKeyDown(event) {
    // starts movement of the right paddle when key is pressed
    if (event.which === KEY.UP) {
        paddleRight.speedY = -6;
    } else if (event.which === KEY.DOWN) {
        paddleRight.speedY = 6;
    }
    // starts movement of the left paddle when key is pressed
    if (event.which === KEY.W) {
        paddleLeft.speedY = -6;
    } else if (event.which === KEY.S) {
        paddleLeft.speedY = 6;
    } 
  }

  function handleKeyUp(event) {
      // stops movement of the right paddle when key is released
      if (event.which === KEY.UP) {
          paddleRight.speedY = 0;
      } else if (event.which === KEY.DOWN) {
          paddleRight.speedY = 0;
      }
      // stops movement of the left paddle when key is released
      if (event.which === KEY.W) {
          paddleLeft.speedY = 0;
      } else if (event.which === KEY.S) {
          paddleLeft.speedY = 0;
      }
  }
   

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame(gameWinner) {
    // stops the interval timer
    clearInterval(interval);
    // turns off event handlers
    $(document).off();
    // displays the winner when the game ends
    $('#gameOver').text(gameWinner + " wins!")
                  .show();
    $('#button').show();
  }

  function moveRightPaddle() {
      // updates the position of the right paddle in the newFrame function
      paddleRight.y += paddleRight.speedY;
      $("#paddleRight").css('top', paddleRight.y);
  }

  function moveLeftPaddle() {
      // updates the position of the left paddle in the newFrame function
      paddleLeft.y += paddleLeft.speedY;
      $("#paddleLeft").css('top', paddleLeft.y);
  }

  function moveBall() {
    // updates the position of the ball in the newFrame function
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    $("#ball").css('top', ball.y);
    $("#ball").css('left', ball.x);
  }

  function ballStart () {
    // gives a 50/50 chance for the ball to start with a positive or negative x speed
    if(Math.random() < 0.5) {
        ball.speedX = 8;
    } else {
        ball.speedX = -8;
    }
    // gives a 50/50 chance for the ball to start with a positive or negative y speed between 1 and 2
    if(Math.random() < 0.5) {
        ball.speedY = randomSpeed(2);
    } else {
        ball.speedY = randomSpeed(-2);
    }
  }
  
  function doCollide(obj1, obj2) {
    // sides of obj1
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.rightX = obj1.x + obj1.width;
    obj1.bottomY = obj1.y + obj1.height;
    // sides of obj2
    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.x + obj2.width;
    obj2.bottomY = obj2.y + obj2.height;

    // returns true if they are overlapping, false otherwise
    if ((obj1.leftX < obj2.rightX) && 
        (obj1.rightX > obj2.leftX) &&
        (obj1.topY < obj2.bottomY) &&
        (obj1.bottomY > obj2.topY)) {
      return true
    } else {
      return false
    } 
  }

  // gives player a point and returns the ball and paddles to start
  function pointEarned(id, score) {
    $(id).text(score);
    ball.speedX = 0;
    ball.speedY = 0;
    ball.x = 265;
    ball.y = 190;
    paddleLeft.y = 160;
    paddleRight.y = 160;
  }

  // returns a random speed
  function randomSpeed(speed) {
      return Math.ceil(Math.random() * speed);
  }
}