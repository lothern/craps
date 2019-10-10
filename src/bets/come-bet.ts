import { PassLineBet } from "./pass-line-bet";
import { BetTypes } from "../base-bet";

export class ComeBet extends PassLineBet{
  constructor(amount : number, playerId : string) {
    super(amount, playerId);
    this.betType = BetTypes.COME
  }
}