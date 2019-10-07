import { Player } from '../src/player';
import { CrapsTable } from '../src/craps-table';
import { TableMaker } from './table-maker/table-maker';
import { PassLineBet } from '../src/bets/pass-line-bet';

describe('Player', () => {
  
  let player : Player;
  let testBankRoll : number = 500;

  beforeEach(() =>{
    player = new Player();
    player.bankRoll = testBankRoll;
  });
  
  it('should reduce bankroll when bets are placed', () => {
    let table = new CrapsTable();
    let startingBankRoll = player.bankRoll;
    
    expect(startingBankRoll).toBeGreaterThan(0);
    
    player.placeBets(table);
    
    expect(player.bankRoll).toBeLessThan(startingBankRoll);
    expect(table.getPlayerBets(player.playerId).length). toBeGreaterThan(0);
  });

  it('should increase bankroll when bets are won', () => {
    let table = new CrapsTable();
    let startingBankRoll = player.bankRoll;

    player.placeBets(table);

    let postBetBankRoll = player.bankRoll;

    let playerBets = table.getPlayerBets(player.playerId);
    
    expect(playerBets.length).toBeGreaterThan(0);
    expect(postBetBankRoll).toBeLessThan(startingBankRoll);

    // Simulate bet Win.
    let bet = playerBets[0];
    bet.point = 6;
    bet.win(table);

    player.resolveHand(table);

    expect(player.bankRoll).toBeGreaterThan(postBetBankRoll);
  });

  it('should place a bet if there isn\'t one', () => {
    let table = TableMaker.getTable().value();
    expect(table.bets).toEqual([]);

    player.placeBets(table);
    expect(table.bets.length).toBe(1);

    player.placeBets(table);
    expect(table.bets.length).toBe(1);
  });

  it('should collect bet if there is a payout', () => {
    let table = TableMaker.getTable().value();
    player.bankRoll = 0;

    let bet = new PassLineBet(10, player.playerId);
    bet.payOut = 10;
    table.bets.push(bet);

    player.resolveHand(table);

    expect(player.bankRoll).toBe(10 + 10);
    
  });
});