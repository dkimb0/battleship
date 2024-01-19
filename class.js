export class Ship {
    constructor(length){
        this.length = length;
        this.sunkStatus = false;
        this.numberOfHits = 0;
        this.coordinateArray = []
    }

    hit(){
        this.numberOfHits += 1;
    }

    isSunk(){
        if (this.length <= this.numberOfHits){
            return true;
        }else{
            return false;
        }
    }
}

export class Gameboard {
    constructor(){
        this.allShipsSunk = false;
        this.gameboardSlots = new Array(100);
        this.allShips = {};
    }

    placeShip(length, orientation, coordinateLetter, coordinateNumber, shipName){
        let coordinate = this.convertCoordinateToNumber(coordinateLetter, coordinateNumber);
        this.allShips[shipName] = new Ship(length);
        const outputArray = [];

        for (let i = 0; i < length; i++){
            if(orientation === 'horizontal'){
                this.gameboardSlots[coordinate + i] = shipName;
                outputArray.push(coordinate + i);
            }else if(orientation === 'vertical'){
                this.gameboardSlots[coordinate + i*10] = shipName;
                outputArray.push(coordinate+i * 10);
            }
        }

        this.allShips[shipName].coordinateArray = outputArray;
        return outputArray;
    }

    receiveAttack(coordinate){
        if (!this.gameboardSlots[coordinate]){
            this.gameboardSlots[coordinate] = 'miss';
        }else{
            this.allShips[this.gameboardSlots[coordinate]].hit();
            if(this.allShips[this.gameboardSlots[coordinate]].isSunk()){
                this.allShips[this.gameboardSlots[coordinate]].sunkStatus = true;
            }
            this.gameboardSlots[coordinate] = 'hit';

        }
    }

    isValidAttack(coordinate){
        if (this.gameboardSlots[coordinate] === 'miss' || this.gameboardSlots[coordinate] === 'hit'){
            return false;
        }else{
            return true
        }
    }

    allShipsSunkCheck(){
        let booleanHolder = [];
        for(const boat in this.allShips){
            if(this.allShips[boat].isSunk()){
                booleanHolder.push(true);
            }else{
                booleanHolder.push(false);
            }
        }

        return !booleanHolder.includes(false)

    }

    convertCoordinateToNumber(coordinateLetter, coordinateNumber){
        const letterToNumber = coordinateLetter.toString().toUpperCase().charCodeAt();
        return (letterToNumber - 65) * 10 + (coordinateNumber - 1);
    }

    renderShip(shipCoordinateArray, playerGameboard, color){
        shipCoordinateArray.forEach((cell) => {
            playerGameboard.querySelector(`div[data-cell='${cell}']`).style.backgroundColor = color;    
        })    
    }

    renderBoard(playerGameboard){
        this.gameboardSlots.forEach((slot, index) => {
            if(slot === 'hit'){
                playerGameboard.querySelector(`div[data-cell='${index}']`).style.backgroundColor = 'red';    
            }else if(slot === 'miss'){
                playerGameboard.querySelector(`div[data-cell='${index}']`).style.backgroundColor = 'lightblue';
            }
        })
    }
}

export default class Player {
    constructor(){
        this.gameboard = new Gameboard;
    }

    sendAttack(enemy, enemyCells, enemyDiv, coordinate){
        while(!enemy.gameboard.isValidAttack(coordinate)){

        }
        enemy.gameboard.receiveAttack(coordinate)
    }    

    makeRandomMove(enemy, enemyCells, enemyDiv){
        let computerChoice = Math.floor(Math.random() * 100);
        while(!enemy.gameboard.isValidAttack(computerChoice)){
            computerChoice = Math.floor(Math.random() * 100);
        }

        enemy.gameboard.receiveAttack(computerChoice);
        enemy.gameboard.renderBoard(enemyDiv)


    }


}