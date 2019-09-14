import { CrapsTable } from "./craps-table";
import { Bet } from "./bet";

export class Player {
  playerId : string;

  constructor(){  }

  placeBets(table : CrapsTable) : void {
    let bet = new Bet(10, this.playerId);
    table.placeBet(bet);
  };

  static getPlayer() : Player {
    let output = new Player();
    output.playerId = Date.now().toString();
    return output;
  }
}