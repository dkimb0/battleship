import Player from "./class.js";


//init
//place default ships function
const player = new Player
const computer = new Player

//query selector of each player's gameboard div
const playerDiv = document.querySelector('#playerOneGameboard');
const computerDiv = document.querySelector('#playerTwoGameboard');

//query selector of each player's gameboard of cells (node list of all 100)
const playerCells = playerDiv.querySelectorAll('div[data-cell]');
const computerCells = computerDiv.querySelectorAll('div[data-cell]');

//generate, place and render ships:
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
        computer.gameboard.receiveAttack(e.dataset.cell);
        computer.gameboard.renderBoard(computerDiv);
    }
    )
})

//gameLoop
let gameOver = false;
// while(!gameOver){
//     let currentTurn = 1;
// }

computer.makeRandomMove(player, playerCells, playerDiv);
computer.makeRandomMove(player, playerCells, playerDiv);
computer.makeRandomMove(player, playerCells, playerDiv);
computer.makeRandomMove(player, playerCells, playerDiv);
computer.makeRandomMove(player, playerCells, playerDiv);
computer.makeRandomMove(player, playerCells, playerDiv);
computer.makeRandomMove(player, playerCells, playerDiv);


// to test, run for loop for 10 to try out 10 turns:
let currentTurn = 1;
for (let i = 0; i < 10; i++){
    if (currentTurn % 2 === 1){

    }else{

    }

}