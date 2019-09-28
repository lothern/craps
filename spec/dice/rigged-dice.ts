import { Dice } from "../../src/dice/dice";

export class RiggedDice extends Dice {
  
  rollQueue : number[];

  constructor(rollQueue? : number[] ) {
    super();
    this.rollQueue = [].concat(rollQueue || []);
  }

  doRoll() : number {
    if (this.rollQueue.length == 0) {
      throw new RangeError('Exceeded RiggedDice roll queue.');
    }
    return this.rollQueue.shift();
  }

  addToQueue( numbersToAdd : number | number[] ) : void {
    if(Array.isArray(numbersToAdd)) {
      this.rollQueue.push(...[].concat(numbersToAdd))
    } else {
      this.rollQueue.push(numbersToAdd);
    }
  }

}