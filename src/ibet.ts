import { CrapsTable } from "./craps-table";

export interface IBet {
  amount : number;
  player: string;
  payOut : number;

  evaluateDiceRoll(rollValue: number, table: CrapsTable) : void; 
  win(table : CrapsTable) : void;
  lose(): void;
}