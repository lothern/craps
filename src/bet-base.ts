import { CrapsTable } from "./craps-table";

export abstract class BetBase {
  amount : number;
  player: string;
  payOut : number;
  point : number;

  constructor(amount: number, playerId: string) {
    this.amount = amount
    this.player = playerId;
  }

  abstract evaluateDiceRoll(rollValue: number, table: CrapsTable) : void; 
  abstract win(table : CrapsTable) : void;
  abstract lose(): void;
}