import { Player } from '../src/player';
import { CrapsTable } from '../src/craps-table';

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

  xit('should increase bankroll when bets are won', () => {
    let table = new CrapsTable();
    let startingBankRoll = player.bankRoll;

    player.placeBets(table);
    let playerBets = table.getPlayerBets(player.playerId);
    
    expect(playerBets.length).toBeGreaterThan(0);

    // Simulate bet Win.
    let bet = playerBets[0];
    bet.point = 6;
    bet.win();

    player.resolveHand(table);

    expect(player.bankRoll).toBeGreaterThan(startingBankRoll);
  });
});