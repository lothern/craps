import { CrapsTable } from "./craps-table";
import { Bet } from "./bet";

export class Player {
  playerId : string;
  bankRoll : number;

  constructor(){  }

  placeBets(table : CrapsTable) : void {
    let betAmount = 10;

    this.bankRoll = this.bankRoll - betAmount;
    let bet = new Bet(betAmount, this.playerId);

    table.placeBet(bet);
  };

  resolveHand(table: CrapsTable) {
    let myBets = table.getPlayerBets(this.playerId);
    myBets.forEach(bet => {
      if (bet.payOut) {
        this.bankRoll += bet.payOut;
        bet.payOut = 0; 
      }
    })
  }

  static getPlayer() : Player {
    let output = new Player();
    output.playerId = Date.now().toString();
    return output;
  }
}