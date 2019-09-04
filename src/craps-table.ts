import { Bet } from './bet';
import { Dice } from './dice/dice';
import * as _ from 'lodash';

export class CrapsTable {
  
  public currentPoint: number

  public dice: Dice;
  
  private _isPointOn: boolean = false;
  
  private _bets: Bet[] = [];
  
  
  constructor(){
    this.dice = new Dice();
  }
  
  get isPointOn(): boolean {
    return this._isPointOn;
  };
  
  placeBet(bet: Bet) : void {
    this._bets.push(bet);
  };

  get bets() : Bet[] {
    return this._bets;
  };
  
  getPlayerBets(playerId: string) : Bet[] {
    let playerBets = _.filter(this._bets, bet => {
      return bet.player == playerId;
    });
    return _.clone(playerBets);
  }

  rollDice() : void {
    // Roll dice and resolve bets.
    let rollvalue = this.dice.roll();

    // Resolve the bets
    this.resolveBets(rollvalue);
    
    if (this._isPointOn) {
      if (this.currentPoint === rollvalue) {
        this._isPointOn = false;
        this.currentPoint = undefined;
      }
    } else {
      if (rollvalue >= 4 && rollvalue <= 6 || 
        rollvalue >= 6 && rollvalue <=10) {
        this._isPointOn = true;
        this.currentPoint = rollvalue;
      }
    }
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
