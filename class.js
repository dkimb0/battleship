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
    //switch out orientation for isVertical? then we can just do true/false
    placeShip(length, isVertical, coordinateLetter, coordinateNumber, shipName){
        let coordinate = this.convertCoordinateToNumber(coordinateLetter, coordinateNumber);
        this.allShips[shipName] = new Ship(length);
        const outputArray = [];

        for (let i = 0; i < length; i++){
            if(isVertical){
                this.gameboardSlots[coordinate + i*10] = shipName;
                outputArray.push(coordinate+i * 10);
            }else{
                this.gameboardSlots[coordinate + i] = shipName;
                outputArray.push(coordinate + i);
            }
        }

        this.allShips[shipName].coordinateArray = outputArray;
        return outputArray;
    }

    receiveAttack(coordinate){
        if (!this.gameboardSlots[coordinate]){
            this.gameboardSlots[coordinate] = 'miss';
            return false;
        }else{
            this.allShips[this.gameboardSlots[coordinate]].hit();
            if(this.allShips[this.gameboardSlots[coordinate]].isSunk()){
                this.allShips[this.gameboardSlots[coordinate]].sunkStatus = true;
                this.allShips[this.gameboardSlots[coordinate]].coordinateArray.forEach((coordinate) => {
                    this.gameboardSlots[coordinate] = 'sunk';
                })
            }else{
                this.gameboardSlots[coordinate] = 'hit';
            }
            return true;

        }
    }

    isValidAttack(coordinate, gameOver){
        if (gameOver){
            return false;
        }
        if (coordinate < 0 || coordinate > 99 || coordinate === null){
            return false;
        }
        if (this.gameboardSlots[coordinate] === 'miss' ||
            this.gameboardSlots[coordinate] === 'hit' ||
            this.gameboardSlots[coordinate] === 'sunk'){
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
            }else if (slot === 'sunk'){
                playerGameboard.querySelector(`div[data-cell='${index}']`).style.backgroundColor = 'pink';
            }
        })
    }

    clearBoard(playerDiv){
        this.gameboardSlots.forEach((slot, index) => {
            playerDiv.querySelector(`div[data-cell='${index}']`).style.backgroundColor = 'white';    
        })
        this.gameboardSlots = new Array(100);
        this.allShips = {};
    }

    randomPlaceShips(shipLength, shipName){
        let isValidShipPlacement = false;
        let isVertical;
        let randomLetter;
        let randomNumber;
        let randomCoordinateString;
        let shipCoordinateArray;


        while (!isValidShipPlacement){
            shipCoordinateArray = [];
            //if orientation is 1: vertical, 2: horizontal
            isVertical = Math.random() < 0.5;
            randomLetter = Math.floor(Math.random() * 10) + 65;
            randomNumber = Math.floor(Math.random() * 10) + 1;
    
            if (isVertical){
                for(let i = 0; i < shipLength; i++ ){
                    randomCoordinateString = `${String.fromCharCode(randomLetter + i)}${randomNumber}`;
                    shipCoordinateArray.push(randomCoordinateString);
                }
            }else{
                for(let i = 0; i < shipLength; i++){
                    randomCoordinateString = `${String.fromCharCode(randomLetter)}${randomNumber+i}`;
                    shipCoordinateArray.push(randomCoordinateString);
                }
            }

            console.log(shipCoordinateArray);

            isValidShipPlacement = true;

            shipCoordinateArray.forEach((coordinate) => {
                console.log(coordinate[0]);
                console.log(coordinate.slice(1));
                let coordinateNumber = this.convertCoordinateToNumber(coordinate[0], coordinate.slice(1));
                if(this.gameboardSlots[coordinateNumber]){
                    isValidShipPlacement = false;
                }
                if(coordinateNumber > 99){
                    isValidShipPlacement = false;
                }
                //for horizontal wrapping
                if(!isVertical && randomNumber + shipLength -1 > 10 ){
                    isValidShipPlacement = false;
                }
            })

            if (isValidShipPlacement){
                console.log('success');
                return this.placeShip(shipLength, isVertical, String.fromCharCode(randomLetter), randomNumber, shipName);
            }
        }
        

    }
}

export default class Player {
    constructor(name){
        this.name = name;
        this.gameboard = new Gameboard;
        this.movesToMakeAI = [];
    }

    makeRandomMove(enemy, enemyDiv, gameOver){
        if(gameOver) return;

        let isHit = false;
        let computerChoice = null;

        while(!enemy.gameboard.isValidAttack(computerChoice)){
            if(this.movesToMakeAI.length > 0){
                computerChoice = this.movesToMakeAI.pop();
            }else{
                computerChoice = Math.floor(Math.random() * 100);
            }
        }

        isHit = enemy.gameboard.receiveAttack(computerChoice);

        if(isHit){
            if(enemy.gameboard.gameboardSlots[computerChoice] === 'sunk'){
                this.movesToMakeAI = [];
            }else{
                if(enemy.gameboard.isValidAttack(computerChoice+1)){
                    this.movesToMakeAI.push(computerChoice+1);
                }
                if(enemy.gameboard.isValidAttack(computerChoice-1)){
                    this.movesToMakeAI.push(computerChoice-1);
                }
                if(enemy.gameboard.isValidAttack(computerChoice+10)){
                    this.movesToMakeAI.push(computerChoice+10);
                }
                if(enemy.gameboard.isValidAttack(computerChoice-10)){
                    this.movesToMakeAI.push(computerChoice-10);
                }
            }
        }
        enemy.gameboard.renderBoard(enemyDiv)
    }

    gameOverCheck(enemy, gameOver, messageDiv){
        if(gameOver === true){
            return true;
        }
        
        if(this.gameboard.allShipsSunkCheck()){
            messageDiv.textContent = `game over. ${enemy.name} wins`;
            return true;
        }else{
            return false;
        }
    }
}