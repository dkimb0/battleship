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
        this.missedAttacks = [];
        this.allShipsSunk = false;
    }

    receiveAttack(x, y){
        //if missed, add to missedAttacks

        //else if hit, which boat was hit?
    }
}