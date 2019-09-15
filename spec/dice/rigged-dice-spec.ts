import { RiggedDice } from "./rigged-dice";

describe('RiggedDice', () => {
  let dice : RiggedDice;

  it('should return the values given it', () => {
    let stackedValues = [6, 5, 4, 3, 12, 2, 9];
    dice = new RiggedDice(stackedValues);

    let rolls : number[] = [];

    for (let i : number = 0; i < stackedValues.length; i++ ) {
      rolls.push(dice.roll());
    }

    expect(rolls).toEqual(stackedValues);
  });

  it('should allow you to add to rolls', () => {
    dice = new RiggedDice();
    expect(dice.rollQueue).toEqual([]);

    let desiredRoll = 6;
    dice.addToQueue(desiredRoll);
    expect(dice.roll()).toBe(desiredRoll);

    let theOneAfter = 7;
    dice.addToQueue([desiredRoll, theOneAfter])

    expect(dice.roll()).toBe(desiredRoll);
    expect(dice.roll()).toBe(theOneAfter);
  });
});