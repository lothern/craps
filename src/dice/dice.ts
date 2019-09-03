import { MersenneTwister } from '../dice/mersenne-twister';

export class Dice {

  private twister: MersenneTwister;

  constructor() {
    this.twister = new MersenneTwister();
  };

  roll():number {
    let dValue1 = this.rollD6();
    let dVvalue2 = this.rollD6();

    return dValue1 + dVvalue2;
  };

  private rollD6() : number {
    let die = Math.round(this.twister.random() * 10000);
    return (die % 6) + 1
  };
}