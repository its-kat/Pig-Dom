/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevDice, dice1, dice2, winningScore;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
		
		// don't start game until winning score is picked
		if (winningScore === 0 || winningScore === undefined) {
			dice1 = 0;
			dice2 = 0;
			prevDice = [];
			document.querySelector('.dice1').style.display = 'none';
			document.querySelector('.dice2').style.display = 'none';
			document.querySelector('#current-' + activePlayer).textContent = 0;
			
			var message = 'Enter winning score to play the game!';
            window.alert(message);
		
		} else {
			// 1. Random number
			dice1 = Math.floor(Math.random() * 6) + 1;
			dice2 = Math.floor(Math.random() * 6) + 1;

			//2. Display the result
			var diceDOM1 = document.querySelector('.dice1');
			diceDOM1.style.display = 'block';
			diceDOM1.src = 'dice-' + dice1 + '.png';

			var diceDOM2 = document.querySelector('.dice2');
			diceDOM2.style.display = 'block';
			diceDOM2.src = 'dice-' + dice2 + '.png';
		
		}
		
        
        //3. Update the round score IF the rolled number was NOT a 1
        if (dice1 !== 1 || dice2 !==1) {
            //Add score
            roundScore += (dice1 + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }	
		
		//player loses current score when one of dice is a 1
        if (dice1 === 1 || dice2 === 1) {

			prevDice = [];
			//update UI
            document.querySelector('#current-' + activePlayer).textContent = 0;
			var message = 'Rolled a 1 loss! Next Player';
			window.alert(message);
			
			nextPlayer();
			
        } else {
			//store roll in array
			prevDice.unshift(dice1,dice2);
			console.log(prevDice);
			gamePlaying;
        }
		
		// A player looses his ENTIRE score when he rolls two 6 in a row.
		var sortedDice = prevDice.slice().sort();

		
		for (var i= 0; i < sortedDice.length - 1; i++) {

			if (sortedDice[i] === 6 && sortedDice[i + 1] === 6) {
				
				//update scores
				 prevDice = [];
		         scores[activePlayer] = 0;
		         roundScore = 0;	
				
				//update the UI for change
				document.querySelector('#current-' + activePlayer).textContent = roundScore;
				document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
				
				//show message of loss
				var message = 'Double 6 roll loss! Next Player';
				window.alert(message);
				
				nextPlayer(); 
			} else {
				gamePlaying;
			}
			
		}
	
    }    
});


//set winning score
document.getElementById('winning-score').addEventListener('change', function() {		
	if (winningScore === 0 || winningScore === undefined) {
		var userScore = document.getElementById('winning-score').value;
		winningScore = userScore;
	} else {
		gamePlaying;
	}
});

//hold feature
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		prevDice = [];

        // Check if player won the game 
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice1').style.display = 'none';
			document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});



function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice1').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    prevDice = [];
	winningScore = undefined;
    
	document.getElementById('winning-score').value = 0;
    document.querySelector('.dice1').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}




/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/