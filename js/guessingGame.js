/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
  //Use random function generator to generate number unique for each game.
  return Math.floor(Math.random() * 100);
}

// Fetch the Players Guess

function playersGuessSubmission(){
  //Retrieves and outputs player's guess from their input 
  playersGuess = +$('#fish-guess').val();
  $(this).closest('.game').find('#fish-guess').val("");
  checkGuess();
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
  // add code here
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
  // Check to see if the player's guess is equal to winning number
  var checkResult = (winningNumber === playersGuess) ? true : false;
  console.log("Check Result: " + checkResult);
  if(checkResult){
    $(this).closest('.speech').find('.penguintalk').text("YUM!!");
  } else {
    $(this).closest('.speech').find('.penguintalk').text("Oooh that's not right! Try again!");
  }
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
  // add code here
}

// Allow the "Player" to Play Again

function playAgain(){
  // add code here
}

/** Game Starts **/

winningNumber = generateWinningNumber(); // Generate Initial Winning Number
/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
  //Get Player's Guess and remove from DOM
  $('.guess').on('click', playersGuessSubmission);
});
  


