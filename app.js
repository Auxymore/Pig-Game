/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, gamePlaying;

init();

var currentDice;

document.querySelector(".btn-roll").addEventListener("click", function(){

  if(gamePlaying){

    var dice = Math.floor(Math.random()*6) + 1;
    var dice2 = Math.floor(Math.random()*6) + 1;

    var diceDOM = document.querySelector(".dice");
    var diceDOM2 = document.querySelector(".dice2");

    diceDOM.style.display = "block";
    diceDOM2.style.display = "block";

    diceDOM.src = "dice-" + dice + ".png";
    diceDOM2.src = "dice-" + dice2 + ".png";
/*
    if( dice === 6 && currentDice === 6 ){
      score[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    }
    */

    if (dice !== 1 && dice2 !== 2){
      roundScore += dice + dice2
      document.querySelector("#current-" + activePlayer).textContent = roundScore;

    }else{
      nextPlayer();
    }
  }
  /*currentDice = dice;
  console.log(dice, currentDice);
  */
});

document.querySelector(".btn-hold").addEventListener("click", function(){

  if(gamePlaying){

    // Add CURRENT score to GLOBAL roundScore
    score[activePlayer] += roundScore;

    // Update UI
    document.querySelector("#score-" + activePlayer).textContent = score[activePlayer];

    var input = document.querySelector("#scoreToBeat").value;
    var winningScore;

    if (input){
      winningScore = input;
    }else{
      winningScore = 100;
    }

    // Check if a player won the game
    if (score[activePlayer] >= winningScore ){
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".player-"+ activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-"+ activePlayer + "-panel").classList.remove("active");
      document.querySelector(".dice").style.display = "none";
      gamePlaying = false;

    }else{
      //  Next Player
      nextPlayer();
    }
  }
});

function nextPlayer(){

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
};

document.querySelector(".btn-new").addEventListener("click", init);

gamePlaying = true;

function init(){
  score = [0, 0];
  activePlayer = 0;
  roundScore = 0;

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player1";
  document.getElementById("name-1").textContent = "Player2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add ("active");
};
