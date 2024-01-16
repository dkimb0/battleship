import Ship from "./index.js";

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