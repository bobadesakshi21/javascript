/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gamePlaying){
        console.log('Inside btn function after event');

        //1.Random Number generation on dice
        dice = Math.floor(Math.random() * 6) + 1;
    
        //2.Display Correct Dice image
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';
    
        //3.Updating the round Score(current score) if the number on the dice is not 1
        if(dice > 1){
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }else{  //if number on dice is 1
    
            //remove dice image
            //diceDom.style.display = 'none';
    
            //next Player
            nextPlayer();
        }
    }

});
document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying){
        //Add current score to global score;
        scores[activePlayer] += roundScore;

        //update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //check if the payer won 
        if(scores[activePlayer] >= 100){
            document.getElementById('name-'+ activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying=false;
        }else{
            //next Player
            nextPlayer();
        }

    }
});

function nextPlayer() {
    //change activePlayer
    activePlayer = (activePlayer == '0')? 1 : 0;
    console.log('activePlayer:'+activePlayer);
    
    //reset round score
    roundScore = 0;
    
    //set current score equal to zero
    document.getElementById('current-0').innerHTML = '0';
    document.getElementById('current-1').innerHTML = '0';

    //toggle active class depending on the active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').innerHTML = '0';
    document.getElementById('score-1').innerHTML = '0';
    document.getElementById('current-0').innerHTML = '0';
    document.getElementById('current-1').innerHTML = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
    
}
