import { CrapsTable } from '../src/craps-game';
import { Bet } from '../src/bet';

describe('CrapsGame', (): void => {
  let table : CrapsTable;

  beforeEach(() => {
    table = new CrapsTable();
  });

  it('should instance', () => {
    expect(table).toBeDefined();
  });

  it('should know if the point is on', () =>{
    expect(table.isPointOn).toBe(false);
  });
  
  it('should allow you to place a pass line bet', () => {
    expect(table.placedBets.length).toBe(0);
    table.placeBet(new Bet(1));
    expect(table.placedBets.length).toBe(1);
  });

  it('should take bets on 2,3,12 when point is off', ()=> {
    let crapsRolled = function(rollValue : number) {
      table.placeBet(new Bet(1));
      table.resolveBets(rollValue);
      expect(table.placedBets.length).toBe(0);
    }

    crapsRolled(2);
    crapsRolled(3);
    crapsRolled(12);
  });

  it('should set the point on when a 4 is rolled', () =>{
    expect(table.isPointOn).toBe(false);
    table.placeBet(new Bet(1));
    spyOn(table.dice, 'roll').and.returnValue(4);

    table.rollDice();
    expect(table.isPointOn).toBe(true);
  })

});