import Player, {Ship, Gameboard} from "./class.js";

test('hits ship, checks numberOfHits is 1', () => {
    const testShip = new Ship(4);
    testShip.hit();
    expect(testShip.numberOfHits).toBe(1);
})

test('hits 2 length ship twice, returns isSunk to true', () => {
    const testShipSunk = new Ship(2);
    testShipSunk.hit();
    testShipSunk.hit();
    expect(testShipSunk.isSunk()).toBeTruthy();
})

test('place ship horizontal, sets gameboard coordinates', () => {
    const testGameboard = new Gameboard;
    testGameboard.placeShip(2, 'horizontal', "A", 1, 'destroyer');
    expect(testGameboard.gameboardSlots[0]).toBe('destroyer');
    expect(testGameboard.gameboardSlots[1]).toBe('destroyer');
})

test('place ship vertical, sets gameboard coordinates', () => {
    const testGameboard = new Gameboard;
    testGameboard.placeShip(4, 'vertical', "A", 1, 'carrier');
    expect(testGameboard.gameboardSlots[0]).toBe('carrier');
    expect(testGameboard.gameboardSlots[10]).toBe('carrier');
    expect(testGameboard.gameboardSlots[20]).toBe('carrier');
    expect(testGameboard.gameboardSlots[30]).toBe('carrier');
})

test('receive attack coordinates, states ship hit, triggers hit() on ship obj', () => {
    const testGameboard = new Gameboard;
    testGameboard.placeShip(4, 'vertical', "A", 1, 'carrier');
    testGameboard.receiveAttack(0);
    expect(testGameboard.allShips.carrier.numberOfHits).toBe(1);
})

test('receive attack coordinates, misses', () => {
    const testGameboard = new Gameboard;
    testGameboard.placeShip(4, 'vertical', "A", 1, 'carrier');
    testGameboard.receiveAttack(13);
    expect(testGameboard.allShips.carrier.numberOfHits).toBe(0);
    expect(testGameboard.gameboardSlots[13]).toBe('miss')
})

test('check if all ships in allShips obj are sunk', () => {
    const testGameboard = new Gameboard;
    testGameboard.placeShip(2, 'horizontal', "A", 1, 'destroyer');
    testGameboard.receiveAttack(0);
    testGameboard.receiveAttack(1);
    expect(testGameboard.allShipsSunkCheck()).toBeTruthy();
})

test('check if all ships in allShips obj are sunk (false)', () => {
    const testGameboard = new Gameboard;
    testGameboard.placeShip(2, 'horizontal', "A", 1, 'destroyer');
    testGameboard.placeShip(5, 'vertical', "A", 9, 'carrier');
    console.log(testGameboard.gameboardSlots[0])
    testGameboard.receiveAttack(0);
    testGameboard.receiveAttack(1);
    expect(testGameboard.allShipsSunkCheck()).toBeFalsy();
})

test('randomPlaceShips orientation and randomLetter/Number generation', ()=>{
    const player = new Player('player');
    player.gameboard.randomPlaceShips(player, 5);
})