import { TableTimeMachine } from './table-time-machine';
import { CrapsTable } from '../../src/craps-table';
import { LiveDice } from '../../src/dice/dice';
import { StackedDice } from '../dice/stacked-dice';

describe('TableTimeMachine', () => {

  it('should provide a vanilla CrapsTable', () => {
    let ttm = new TableTimeMachine()
    expect(ttm).toBeDefined();

    let table = new CrapsTable();
    ttm = new TableTimeMachine(table);
    expect(ttm).toBeDefined();
    expect(ttm.value()).toEqual(table);

    ttm = TableTimeMachine.getTable();
    expect(ttm).toBeDefined();
  });

  it('should provide a table that has the point set', () => {
    let desiredPoint = 6;
    let table = TableTimeMachine.getTable().havingPoint(desiredPoint).value();
    expect(table.isPointOn).toBe(true);
    expect(table.currentPoint).toBe(desiredPoint);
    expect(table.dice instanceof LiveDice);
  });

  it('should provide a table that has stacked die', () => {
    let stackedDiceRolls = [4,2];
    let table = TableTimeMachine.getTable().withStackedDice(stackedDiceRolls).value();
    expect(table.dice instanceof StackedDice);
    let stackedDice : StackedDice = table.dice as StackedDice;
    expect(stackedDice.rollQueue).toEqual(stackedDiceRolls);
  })
});