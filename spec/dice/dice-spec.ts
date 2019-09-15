import { Dice, LiveDice } from '../../src/dice/dice';
import * as _ from 'lodash';
import { RiggedDice } from './rigged-dice';

describe('Dice', ():void => {

  let d : Dice;

  let getRollHash = function() {
    let rolls = new Map<number, number>();
    _.range(2,13).forEach((i) => {
      rolls.set(i, 0);
    });
    return rolls;
  }

  let historyCheck = function(dice: Dice) : void {
    let rollCount = 0;
    let rollValues = [];

    while (rollCount < 10) {
      rollValues.push(dice.roll());
      rollCount++;
    }
    expect(rollValues).toEqual(dice.rollHistory);
  };

  it('should keep a roll history—all types.', () => {
    historyCheck(new LiveDice());
    historyCheck(new RiggedDice(_.range(2,13)));
  });

  describe('LiveDice', () => {
    beforeEach(() => {
      d = new LiveDice();
     });
   
     it('should be between 2 and 12', () => {
       let roll = d.roll();
       expect(roll).toBeLessThanOrEqual(12);
       expect(roll).toBeGreaterThanOrEqual(2);
     });
   
     it('should roll all numbers 2 to 12', () => {
       let rolls = getRollHash();
       let totalRolls = 1000000;
       let i = 0
       while(i < totalRolls ){
         let roll = d.roll();
         let value = rolls.get(roll);
         rolls.set(roll, value + 1);
         i++
       }
   
       for (let key of rolls.keys()) {
         let rollCount = rolls.get(key);
         // Outputs roll counts and %
         // console.log(key, ', ', rollCount, ',', rollCount/totalRolls);
         expect(rolls.get(key)).toBeGreaterThan(0);
       }
     });
  });  
});