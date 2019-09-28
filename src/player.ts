import { CrapsTable } from "./craps-table";
import { Bet } from "./bet";

export class Player {
  playerId: string;
  bankRoll: number;

  constructor() {
    this.playerId = Date.now().toString();
  }

  placeBets(table: CrapsTable): void {
    let myBets = table.getPlayerBets(this.playerId);

    if (myBets.length == 0) {
      let betAmount = 10;

      this.bankRoll = this.bankRoll - betAmount;
      let bet = new Bet(betAmount, this.playerId);

      table.placeBet(bet);
    }
  };

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
    })
  }

  static getPlayer(): Player {
    let output = new Player();
    output.playerId = Date.now().toString();
    return output;
  }
}