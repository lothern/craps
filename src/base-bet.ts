import { CrapsTable } from "./craps-table";

export enum BetTypes {
  UNKNOWN,
  PASS_LINE,
  COME
}

export abstract class BaseBet {
  betType : BetTypes = BetTypes.UNKNOWN;
  amount : number;
  player: string;
  payOut : number;
  point : number;

  constructor(betType : BetTypes, amount: number, playerId: string) {
    this.betType = betType;
    this.amount = amount
    this.player = playerId;
  }

  abstract evaluateDiceRoll(rollValue: number, table: CrapsTable) : void; 
  abstract win(table : CrapsTable) : void;
  abstract lose(): void;
}