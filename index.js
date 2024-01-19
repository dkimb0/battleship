import Ship, {Gameboard, Player} from "./class.js";


//init
//place default ships function
const player = new Player
const computer = new Player

//query selector of each player's gameboard div
const PlayerDiv = document.querySelector('#playerOneGameboard');
const ComputerDiv = document.querySelector('#playerTwoGameboard');

//query selector of each player's gameboard of cells (node list of all 100)
const playerCells = PlayerDiv.querySelectorAll('div[data-cell]');
const computerCells = ComputerDiv.querySelectorAll('div[data-cell]');

//generate, place and render ships:
computer.gameboard.renderShip(computer.gameboard.placeShip(5, 'vertical', 'C', 3, 'carrier'), ComputerDiv, 'white');
computer.gameboard.renderShip(computer.gameboard.placeShip(3, 'vertical', 'A', 2, 'cruiser'), ComputerDiv, 'white');
computer.gameboard.renderShip(computer.gameboard.placeShip(3, 'horizontal', 'F', 6, 'submarine'), ComputerDiv, 'white');
computer.gameboard.renderShip(computer.gameboard.placeShip(2, 'vertical', 'D', 7, 'destroyer'), ComputerDiv, 'white');
computer.gameboard.renderShip(computer.gameboard.placeShip(4, 'horizontal', 'A', 5, 'battleship'), ComputerDiv, 'white');

player.gameboard.renderShip(player.gameboard.placeShip(5, 'vertical', 'E', 4, 'carrier'), PlayerDiv, 'lightgrey');
player.gameboard.renderShip(player.gameboard.placeShip(3, 'vertical', 'B', 1, 'cruiser'), PlayerDiv,'lightgrey');
player.gameboard.renderShip(player.gameboard.placeShip(3, 'horizontal', 'F', 6, 'submarine'), PlayerDiv, 'lightgrey');
player.gameboard.renderShip(player.gameboard.placeShip(2, 'vertical', 'H', 8, 'destroyer'), PlayerDiv, 'lightgrey');
player.gameboard.renderShip(player.gameboard.placeShip(4, 'horizontal', 'B', 6, 'battleship'), PlayerDiv, 'lightgrey');


computerCells.forEach((e) => {
    e.addEventListener('click', () => {
        gameboardPlayerTwo.receiveAttack(e.dataset.cell);
        gameboardPlayerTwo.renderBoard(ComputerDiv);
    }
    )
})

//gameLoop
let gameOver = false;
// while(!gameOver){
//     let currentTurn = 1;
// }


// to test, run for loop for 10 to try out 10 turns:
let currentTurn = 1;
for (let i = 0; i < 10; i++){
    if (currentTurn % 2 === 1){

    }

}