import Player from "./class.js";


//new game init
//place default ships function
const player = new Player('player');
const computer = new Player('computer');
let gameOver = true;
let playerEnabled = true;

//query selector of each player's gameboard div
const playerDiv = document.querySelector('#playerOneGameboard');
const computerDiv = document.querySelector('#playerTwoGameboard');

//query selector of each player's gameboard of cells (node list of all 100)
const playerCells = playerDiv.querySelectorAll('div[data-cell]');
const computerCells = computerDiv.querySelectorAll('div[data-cell]');

const newGameButton = document.getElementById('newGameButton');
const messageBox = document.getElementById('message');

newGameButton.addEventListener('click', (e) => {
    player.gameboard.clearBoard(playerDiv);
    computer.gameboard.clearBoard(computerDiv);
    initNewGame();
})

function initNewGame(){
    //generate, place and render ships:
    gameOver = false;
    messageBox.textContent = '';
 
    //remove ship names, useless?
    computer.gameboard.randomPlaceShips(5, 'carrier');
    computer.gameboard.randomPlaceShips(3, 'cruiser');
    computer.gameboard.randomPlaceShips(3, 'submarine');
    computer.gameboard.randomPlaceShips(2, 'destroyer');
    computer.gameboard.randomPlaceShips(4, 'battleship');

    player.gameboard.renderShip(player.gameboard.randomPlaceShips(5, 'carrier'), playerDiv, 'lightgrey');
    player.gameboard.renderShip(player.gameboard.randomPlaceShips(3, 'cruiser'), playerDiv,'lightgrey');
    player.gameboard.renderShip(player.gameboard.randomPlaceShips(3, 'submarine'), playerDiv, 'lightgrey');
    player.gameboard.renderShip(player.gameboard.randomPlaceShips(2, 'destroyer'), playerDiv, 'lightgrey');
    player.gameboard.renderShip(player.gameboard.randomPlaceShips(4, 'battleship'), playerDiv, 'lightgrey');


    computerCells.forEach((e) => {
        e.addEventListener('click', () => {
            if(computer.gameboard.isValidAttack(e.dataset.cell, gameOver) && playerEnabled){
                computer.gameboard.receiveAttack(e.dataset.cell);
                computer.gameboard.renderBoard(computerDiv);

                gameOver = computer.gameOverCheck(player, gameOver, messageBox);

                playerEnabled = false;

                setTimeout(()=>{
                    computer.makeRandomMove(player, playerDiv, gameOver);
                    gameOver = player.gameOverCheck(computer, gameOver, messageBox);
                    playerEnabled = true;
                }, 1000);
            }
        }
        )
    })
}