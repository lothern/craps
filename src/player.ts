import { CrapsTable } from "./craps-table";
import { PassLineBet } from "./bets/pass-line-bet";
import { Strategy } from "./strategy";
import { BaseBet } from "./bets/base-bet";

export class Player {
  playerId: string;
  bankRoll: number;
  strategy: Strategy = new Strategy();

  constructor() {
    this.playerId = Date.now().toString();
  }

  placeBets(table: CrapsTable): void {
    let myBets: BaseBet[] = table.getPlayerBets(this.playerId);

    let missingBets = this.strategy.getBetsToPlace(myBets);

    missingBets.forEach(bet => {
      let okayToPlace = bet.isOkayToPlace(table);
      if (okayToPlace) {
        this.bankRoll = this.bankRoll - bet.totalAmount;
        bet.player = this.playerId;
        table.placeBet(bet);
      }
    });
  }

  /**
   * Collect all bets that have a payout
   * @param table
   */
  resolveHand(table: CrapsTable) {
    let myBets = table.getPlayerBets(this.playerId);
    myBets.forEach(bet => {
      if (bet.payOut > 0) {
        this.bankRoll += bet.payOut;
        bet.payOut = 0;
        this.bankRoll += bet.amount;
        bet.amount = 0;
      }
    });
  }

  static getPlayer(): Player {
    let output = new Player();
    output.playerId = Date.now().toString();
    return output;
  }
}
