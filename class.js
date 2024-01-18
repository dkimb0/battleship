export default class Ship {
    constructor(length){
        this.length = length;
        this.sunkStatus = false;
        this.numberOfHits = 0;
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

        for (let i = 0; i < length; i++){
            if(orientation === 'horizontal'){
                this.gameboardSlots[coordinate + i] = shipName;
            }else if(orientation === 'vertical'){
                this.gameboardSlots[coordinate + i*10] = shipName;
            }
        }
    }

    receiveAttack(coordinateLetter, coordinateNumber){
        const coordinate = this.convertCoordinateToNumber(coordinateLetter, coordinateNumber);

        if (!this.gameboardSlots[coordinate]){
            this.gameboardSlots[coordinate] = 'miss';
        }else if (this.gameboardSlots[coordinate] === 'miss' || this.gameboardSlots[coordinate] === 'hit'){
        }else{
            this.allShips[this.gameboardSlots[coordinate]].hit();
            if(this.allShips[this.gameboardSlots[coordinate]].isSunk()){
                this.allShips[this.gameboardSlots[coordinate]].sunkStatus = true;
            }
            this.gameboardSlots[coordinate] = 'hit';

        }
    }

    allShipsSunkCheck(){
        let booleanHolder = false;
        for(const boat in this.allShips){
            console.log(this.allShips[boat].isSunk());
            if(this.allShips[boat].isSunk()){
                booleanHolder = true;
            }else{
                booleanHolder = false;
            }
        }

        return booleanHolder;
    }

    convertCoordinateToNumber(coordinateLetter, coordinateNumber){
        const letterToNumber = coordinateLetter.toString().toUpperCase().charCodeAt();
        return (letterToNumber - 65) * 10 + (coordinateNumber - 1);
    }
}

export class Player {
    constructor(name){
        this.name = name;
    }
}