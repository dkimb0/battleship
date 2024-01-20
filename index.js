import Player from "./class.js";


//new game init
//place default ships function
const player = new Player('player');
const computer = new Player('computer');
let gameOver = true;

//query selector of each player's gameboard div
const playerDiv = document.querySelector('#playerOneGameboard');
const computerDiv = document.querySelector('#playerTwoGameboard');

//query selector of each player's gameboard of cells (node list of all 100)
const playerCells = playerDiv.querySelectorAll('div[data-cell]');
const computerCells = computerDiv.querySelectorAll('div[data-cell]');

const newGameButton = document.getElementById('newGameButton');
const messageBox = document.getElementById('message');

newGameButton.addEventListener('click', (e) => {
    clearGameboards();
    initNewGame();
})

function initNewGame(){
    //generate, place and render ships:
    gameOver = false;
    messageBox.textContent = '';
    computer.gameboard.renderShip(computer.gameboard.placeShip(5, 'vertical', 'C', 3, 'carrier'), computerDiv, 'white');
    computer.gameboard.renderShip(computer.gameboard.placeShip(3, 'vertical', 'A', 2, 'cruiser'), computerDiv, 'white');
    computer.gameboard.renderShip(computer.gameboard.placeShip(3, 'horizontal', 'F', 6, 'submarine'), computerDiv, 'white');
    computer.gameboard.renderShip(computer.gameboard.placeShip(2, 'vertical', 'D', 7, 'destroyer'), computerDiv, 'white');
    computer.gameboard.renderShip(computer.gameboard.placeShip(4, 'horizontal', 'A', 5, 'battleship'), computerDiv, 'white');
    
    player.gameboard.renderShip(player.gameboard.placeShip(5, 'vertical', 'E', 4, 'carrier'), playerDiv, 'lightgrey');
    player.gameboard.renderShip(player.gameboard.placeShip(3, 'vertical', 'B', 1, 'cruiser'), playerDiv,'lightgrey');
    player.gameboard.renderShip(player.gameboard.placeShip(3, 'horizontal', 'F', 6, 'submarine'), playerDiv, 'lightgrey');
    player.gameboard.renderShip(player.gameboard.placeShip(2, 'vertical', 'H', 8, 'destroyer'), playerDiv, 'lightgrey');
    player.gameboard.renderShip(player.gameboard.placeShip(4, 'horizontal', 'B', 6, 'battleship'), playerDiv, 'lightgrey');

    computerCells.forEach((e) => {
        e.addEventListener('click', () => {
            if(computer.gameboard.isValidAttack(e.dataset.cell, gameOver)){
                computer.gameboard.receiveAttack(e.dataset.cell);
                computer.gameboard.renderBoard(computerDiv);

                gameOver = computer.gameOver(player, gameOver, messageBox);
                
                computer.makeRandomMove(player, playerCells, playerDiv, gameOver);
                gameOver = player.gameOver(computer, gameOver, messageBox);
    
            }
        }
        )
    })
}

function clearGameboards(){
    //clear gameboard visually
    player.gameboard.clearBoard(playerDiv);
    computer.gameboard.clearBoard(computerDiv);
    //set gameboardSlots to new Arrray(100);
    player.gameboard.gameboardSlots = new Array(100);
    computer.gameboard.gameboardSlots = new Array(100);
    //set this.allShips to {};
    player.gameboard.allShips = {};
    computer.gameboard.allShips = {};
}