/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.


(function(){
  var playersGuess,
      winningNumber

  var guessArray = [];



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
    var differential = playersGuess - winningNumber;
    var highPrefix = "It's burning here (too high)! ";
    var lowPrefix = "It's freezing here (too low)! ";
    return (differential > 0) ? highPrefix : lowPrefix;
  }
  //Determine if the next guess is close or not
  function coldOrWarm(){
    var closeMessageSuffix = "You are so close, within 5 of my preferred amount";
    var farMessageSuffix = "You are way off. Do you even love me?";
    return (Math.abs(playersGuess - winningNumber) <= 5)? closeMessageSuffix: farMessageSuffix;
  }


  // Check if the Player's Guess is the winning number 

  function checkGuess(){
    // Check to see if the player's guess is equal to winning number
    var checkResult = (winningNumber === playersGuess) ? true : false;
    //Remove guess
    $('#fish-guess').val("");
    if(checkResult){ //If win
      $('.penguintalk').text("YUM!!");
      $('.guessMessage').text("Who needs hints when you've got it on the dot.");
      winState();
    } else {
      $('.guessMessage').text("" + lowerOrHigher() + " "  + coldOrWarm()); 
      if(guessArray.indexOf(playersGuess) == -1){
        guessArray.push(playersGuess);
        if(guessArray.length == 5){
          $('.penguintalk').text("I'm too hungry now, I'm going to look on my own! (You've lost)");
          loseState();
        } else {
          $('.penguintalk').text("Oooh that's not right! Try again! " + (5 - guessArray.length) + " guesses left!");
        }
      } else {
        $('.penguintalk').text("You've already tried to give me that many!");
      }
    }
  }

  // Create a provide hint button that provides additional clues to the "Player"

  function provideHint(){
    /* They will be able to see a choice of different numbers
    one of which is the winning numbers. The numbers shown increase with each
    guess
    */
    var hintArray = [];
    for(var i = 0; i < guessArray.length + 2; i++){
      hintArray.push(Math.floor(Math.random() * 100));
    }
    //Find position to randomly insert winning number
    var truePosition = Math.floor(Math.random() * guessArray.length);
    hintArray.splice(truePosition, 0, winningNumber);
    $('.guessHint').text('One of these is the real amount! ' + hintArray);
    $('.guessHint').toggle();
    //Hide Hint Button
    $('.hint').toggle();

  }

  // Allow the "Player" to Play Again

  function playAgain(){
    //Reset DOM
    $('.guessHint').hide();
    $('.hint').show();
    winningNumber = generateWinningNumber();
    guessArray = [];
    $('.penguintalk').text("I'm Hungry!");
    $('.guessMessage').text("Look Here For Clues!");
    $('.speech').removeClass('win');
    $('.speech').removeClass('lose');
  }

  //Set Winning State
    function winState(){
      $('.speech').addClass('win');
    }

  //Set Losing State
    function loseState(){
      $('.speech').addClass('lose');
    }
  /** Game Starts **/
  winningNumber = generateWinningNumber(); // Generate Initial Winning Number
  /* **** Event Listeners/Handlers ****  */
  $(document).ready(function(){
    //Get Player's Guess and remove from DOM
    $('.guess').on('click', playersGuessSubmission);
    $('.hint').on('click', provideHint);
    $('.retry').on('click', playAgain);
    $('form').submit(function (e){
      e.preventDefault();
    });
    $('#fish-guess').on('keyup', function(e){
        if(e.keyCode == 13){
          playersGuessSubmission();
        }
    });
  });

})()
  


