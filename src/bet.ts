import { CrapsTable } from "./craps-table";
import { CrapsGame } from "./craps-game";

export enum BetTypes {
  PassLine,
};

/**
 *  Pass line or come line bet
 */
export class Bet {

  amount: number = 0;
  payOut: number;
  player: string;
  oddsAmount: number = 0;
  point: number = undefined;

  constructor(amount: number, playerId: string) {
    this.amount = amount;
    this.player = playerId;
  }

  lose() {
    // Zero out the bet anticipating the table will remove 
    // zero amount bets.
    this.amount = 0;
    this.oddsAmount = 0;
  }

  evaluateDiceRoll(rollValue: number, table: CrapsTable) {
    // If there is a point and it's hit, the bet wins.
    if (table.isPointOn && rollValue == table.currentPoint) {
      this.win(table);
    } else {
      // If the point is not made or there is no point
      switch (rollValue) {
        case 2:
        case 3:
        case 12:
          if (!table.isPointOn) {
            this.lose();
          }
          break;
        case 7:
          if (table.isPointOn) {
            // Seven Out
            this.lose();
          } else {
            // 7 on Comeout
            this.win(table)
          }
          break;
        case 11:
          if (!table.isPointOn) {
            // 11 on Comeout
            this.win(table);
          }
          break;
      }

    }

  }

  //Pays: 2:1 on 4, 10; 3:2 on 5, 9; 6:5 on 6,8
  win(table: CrapsTable) {
    this.payOut = this.amount;
    if (this.point) {
      this.payOut += Bet.computeOddsPayout(this, table);
    }
  }

  static computeOddsPayout(bet: Bet, table: CrapsTable): number {
    if (!bet.oddsAmount) {
      return 0;
    }
    switch (bet.point) {
      case 4:
      case 10:
        return bet.oddsAmount * 2;
        break;
      case 5:
      case 9:
        return Math.floor(bet.oddsAmount / 2) * 3;
        break;
      case 6:
      case 8:
        return Math.floor(bet.oddsAmount / 5) * 6;
        break;
    }
  }
}