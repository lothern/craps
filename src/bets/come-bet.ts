import { PassLineBet } from "./pass-line-bet";
import { BetTypes } from "../base-bet";
import { CrapsTable } from "../craps-table";

export class ComeBet extends PassLineBet{
  constructor(amount : number, playerId : string) {
    super(amount, playerId);
    this.betType = BetTypes.COME
  }

  isOkayToPlace(table : CrapsTable) : boolean {
    return table.isPointOn;
  }

  static isOkayToPlace(table : CrapsTable) : boolean {
    let cb = new ComeBet(1, 'dummy');
    return cb.isOkayToPlace(table);
  }
}