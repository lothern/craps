import { CrapsTable } from '../src/craps-game';
import { Bet } from '../src/bet';

describe('CrapsGame', (): void => {
  let table : CrapsTable;

  let points = [4,5,6,8,9,10];

  let getNewTable = function() {
    return new CrapsTable();
  };

  beforeEach(() => {
    table = getNewTable();
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

  it('should set the point on when a 4,5,6,8,9,10 is rolled', () =>{

    let pointRolled = function(rollValue: number){
      table = getNewTable();
      expect(table.isPointOn).toBe(false);
      expect(table.currentPoint).toBeUndefined();
      table.placeBet(new Bet(1));
      spyOn(table.dice, 'roll').and.returnValue(rollValue);
      table.rollDice();
      expect(table.isPointOn).toBe(true);
      expect(table.currentPoint).toBe(rollValue);
    }

    points.forEach(pointRolled);
  })

  it('should set the point off when the current point it rolled', () => {
    
    let pointSetAndMade = function(pointValue: number) {
      table = getNewTable();
      // Confirm point is NOT set.
      expect(table.isPointOn).toBe(false);
      // Establish the point 
      spyOn(table.dice, 'roll').and.returnValue(4);
      table.rollDice();
      // Confirm Point is set.
      expect(table.isPointOn).toBe(true);
      expect(table.currentPoint).toBe(4);
      // Hit the point.
      table.rollDice();
      expect(table.isPointOn).toBe(false);
      expect(table.currentPoint).toBe(undefined);
    }

    points.forEach(pointSetAndMade);
  });

});