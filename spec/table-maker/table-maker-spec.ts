import { TableMaker } from './table-maker';
import { CrapsTable } from '../../src/craps-table';
import { LiveDice } from '../../src/dice/dice';
import { RiggedDice } from '../dice/rigged-dice';

describe('TableTimeMachine', () => {

  it('should provide a vanilla CrapsTable', () => {
    let ttm = new TableMaker();
    expect(ttm).toBeDefined();

    let table = new CrapsTable();
    ttm = new TableMaker(table);
    expect(ttm).toBeDefined();
    expect(ttm.value()).toEqual(table);

    ttm = TableMaker.getTable();
    expect(ttm).toBeDefined();
  });

  it('should provide a table that has the point set', () => {
    let desiredPoint = 6;
    let table = TableMaker.getTable().withPoint(desiredPoint).value();
    expect(table.isPointOn).toBe(true);
    expect(table.currentPoint).toBe(desiredPoint);
    expect(table.dice instanceof LiveDice);
  });

  it('should provide a table that has stacked die', () => {
    let stackedDiceRolls = [4, 2];
    let table = TableMaker.getTable().withRiggedDice(stackedDiceRolls).value();
    expect(table.dice instanceof RiggedDice);
    let stackedDice: RiggedDice = table.dice as RiggedDice;
    expect(stackedDice.rollQueue).toEqual(stackedDiceRolls);
  });

  it('should be able to stack', () => {
    let table = 
      TableMaker.getTable().withRiggedDice([6]).withPoint(6).value();
    expect(table.currentPoint).toBe(6);
    expect(table.isPointOn).toBe(true);
    let dice: RiggedDice = table.dice as RiggedDice;
    expect(dice.rollQueue).toEqual([6]);
  });
});