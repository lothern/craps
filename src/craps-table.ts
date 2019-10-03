import { Bet } from './bet';
import { Dice, LiveDice } from './dice/dice';
import * as _ from 'lodash';

export class CrapsTable {

  public currentPoint: number

  public dice: Dice;

  private _isPointOn: boolean = false;

  private _bets: Bet[] = [];
  bettors: ((table: CrapsTable) => void)[];

  constructor() {
    this.dice = new LiveDice();
    this.bettors = [];
  }

  get isPointOn(): boolean {
    return !(this.currentPoint == undefined);
  };

  getLastRoll() : number {
    return _.last(this.dice.rollHistory);
  }

  placeBet(bet: Bet): void {
    this._bets.push(bet);
  };

  get bets(): Bet[] {
    return this._bets;
  };

  onPlaceBets(bettor: (table: CrapsTable) => void) {
    this.bettors.push(bettor);
  }

  getPlayerBets(playerId: string): Bet[] {
    let playerBets = _.filter(this._bets, bet => {
      return bet.player == playerId;
    });
    return _.clone(playerBets);
  }

  rollDice(): void {

    // TODO: Add player table load logging right before dice roll.
    // How much each player has on the table (# of bets and total amount)

    // Roll dice and resolve bets.
    let rollvalue = this.dice.roll();

    // Resolve the bets
    this.resolveBets(rollvalue);

    // 
    if (this.isPointOn) {
      if (this.currentPoint === rollvalue
        || rollvalue === 7) {
        this.currentPoint = undefined;
      }
    } else {
      if (rollvalue >= 4 && rollvalue <= 6 ||
        rollvalue >= 8 && rollvalue <= 10) {
        this.currentPoint = rollvalue;
      }
    }
  }

  resolveBets(rollValue: number) {

    switch (rollValue) {
      case 2:
      case 3:
      case 12:
        if (!this.isPointOn) {
          this._bets.forEach(bet => {
            bet.lose();
          });
        }
        this._bets = [];
        break;
      case 7:
        if (this.isPointOn) {
          // Seven Out
          this._bets.forEach(bet => {
            bet.lose();
          });
        } else {
          // 7 on Comeout
          this._bets.forEach(bet => {
            bet.win(this)
          })
        }
        break;
      case 11:
        if (!this.isPointOn) {
          // 11 on Comeout
          this._bets.forEach(bet => {
            bet.win(this);
          });
        }
        break;
    }

    if (this.isPointOn && rollValue == this.currentPoint) {
      this._bets.forEach(bet => {
        bet.win(this);
      })

    }
    // Remove zero'd out bets.
    this._bets = _.filter(this._bets, bet => {
      return bet.amount + bet.oddsAmount != 0;
    });
  };
}
