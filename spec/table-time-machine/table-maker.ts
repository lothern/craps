import { CrapsTable } from "../../src/craps-table";
import { StackedDice } from "../dice/stacked-dice";

export class TableMaker {
  private table : CrapsTable;
  
  constructor(table? : CrapsTable) {
    this.table = table || new CrapsTable();
  }
  
  havingPoint(point: number) {
    if((point >=4 && point <=6) || (point >=8 && point <= 10)) {
      let originalDice = this.table.dice;
      let stackedDice = new StackedDice([point]);
      this.table.dice = stackedDice;
      this.table.rollDice()
      this.table.dice = originalDice;
      return this;
    }
    throw new RangeError(`${point} is an invalid point value. Valid values are 4, 5, 6, 8, 9, 10`);
  }

  withStackedDice(stackedDiceRolls: number[]) {
    this.table.dice = new StackedDice(stackedDiceRolls);
    return this;
  }

  value() : CrapsTable {
    return this.table;
  }

  static getTable() {
    return new TableMaker();
  }
}