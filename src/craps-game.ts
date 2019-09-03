import { Bet } from './bet';
import { Dice } from './dice/dice';

export class CrapsTable {
  public dice : Dice;
  
  private _isPointOn: boolean = false;
  
  private _bets: Bet[] = [];
  
  constructor(){
    this.dice = new Dice();
  }

  get isPointOn(): boolean {
    return this._isPointOn;
  };

  get placedBets() : Bet[] {
    return this._bets;
  };

  placeBet(bet: Bet) : void {
    this._bets.push(bet);
  };

  rollDice() : void {
    // Roll dice and resolve bets.
    let dieValue = this.dice.roll();
    this.resolveBets(dieValue);
  }
  
  resolveBets(rollValue: number) {

    switch (rollValue) {
      case 2:
      case 3:
      case 12:
        if(!this._isPointOn) {
          this._bets.forEach(bet => {
            bet.lose(bet);
          });
        }
        this._bets = [];
        break;
      // case 7:
      //   if(this._isPointOn) {
      //     // Seven Out
      //     this._bets.forEach(bet => {
      //       bet.lose(bet);
      //     });
      //   } else {
      //     // 7 on Comeout
      //     this._bets.forEach(bet => {
      //       bet.payOut = bet.amount;
      //       bet.win(bet)
      //     })
      //   }
      //   break;
    }
  }
;
}

enum BetTypes {
  PassLine,
};