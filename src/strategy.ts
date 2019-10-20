import { BaseBet } from "./bets/base-bet";
import * as _ from "lodash";

export class Strategy {
  bets : BaseBet[] = [];
  toPlace: BaseBet[] = [];

  constructor() {
  } 

  getBetsToPlace(playerBets : BaseBet[]) : BaseBet[] {
    let missing = _.differenceWith(this.bets, playerBets, (firstBet, secondBet) => {
      return firstBet.isEqual(secondBet);
    });
    return missing;
  }
}
