import { CrapsGame } from '../src/craps-game';
import { Player } from '../src/player';

describe('craps game', () => {

  let game: CrapsGame;

  beforeEach(() => {
    game = new CrapsGame();
  });

  it('should instance a craps table', () => {
    expect(game).toBeDefined();
    expect(game.table).toBeDefined();
  });

  it('should register players', () => {
    let players = [Player.getPlayer()];
    game.registerPlayers(players);
    expect(game.players).toBeDefined();
    expect(game.players.length).toBe(1);
    // let player = game.players[0];
    // expect(player).toBeDefined();
    // expect(player.playerId).toBeDefined();
  });

  it('should start the game and players should place bets', () => {
    game.registerPlayers([new Player()]);
    
    // Confirm we have some players.
    expect(game.players.length).toBeGreaterThan(0);

    //Start the game, players should bet.
    game.startGame();
    expect(game.table.bets.length).toBeGreaterThan(0);
  });
})