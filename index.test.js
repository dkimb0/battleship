import Ship, {Gameboard} from "./index.js";

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

// test('take in letter + number, return coordinate', () => {
//     const coordinateGameboard = new Gameboard;
//     expect(coordinateGameboard.convertCoordinateToNumber("B", 4)).toBe(13);

// })

test('receive attack coordinates, states ship hit, triggers hit() on ship obj', () => {
    const testGameboard = new Gameboard;
    testGameboard.placeShip(4, 'vertical', "A", 1, 'carrier');
    testGameboard.receiveAttack('A', 1);
    expect(testGameboard.allShips.carrier.numberOfHits).toBe(1);
})

test('receive attack coordinates, misses', () => {
    const testGameboard = new Gameboard;
    testGameboard.placeShip(4, 'vertical', "A", 1, 'carrier');
    testGameboard.receiveAttack('F', 3);
    expect(testGameboard.allShips.carrier.numberOfHits).toBe(0);
    expect(testGameboard.gameboardSlots[testGameboard.convertCoordinateToNumber('F', 3)]).toBe('miss')
})

test('check if all ships in allShips obj are sunk', () => {
    const testGameboard = new Gameboard;
    testGameboard.placeShip(2, 'horizontal', "A", 1, 'destroyer');
    testGameboard.receiveAttack('A', 1);
    testGameboard.receiveAttack('A', 2);
    console.log(testGameboard.allShips.destroyer.isSunk());
    expect(testGameboard.allShipsSunkCheck()).toBeTruthy();
})

test('check if all ships in allShips obj are sunk (false)', () => {
    const testGameboard = new Gameboard;
    testGameboard.placeShip(2, 'horizontal', "A", 1, 'destroyer');
    testGameboard.placeShip(5, 'vertical', "A", 9, 'carrier');
    testGameboard.receiveAttack('A', 1);
    testGameboard.receiveAttack('A', 2);
    console.log(testGameboard.allShips.destroyer.isSunk());
    expect(testGameboard.allShipsSunkCheck()).toBeFalsy();
})