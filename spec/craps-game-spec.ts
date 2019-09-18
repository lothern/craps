import { CrapsGame } from '../src/craps-game';
import { Player } from '../src/player';
import { TableMaker } from './table-maker/table-maker';
import * as _ from 'lodash';

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
    let player = game.players[0];
    expect(player).toBeDefined();
    expect(player.playerId).toBeDefined();
  });

  it('should start the game and players should place bets', () => {
    let player = new Player();
    player.bankRoll = 1000;

    game.registerPlayers([player]);
    
    // Confirm we have some players.
    expect(game.players.length).toBeGreaterThan(0);

    //Start the game, players should bet.
    game.startGame(1);
    expect(game.table.bets.length).toBeGreaterThan(0);
  });

  it('should play one hand (roll)', () => {
    let dieRollCount = game.table.dice.rollHistory.length;
    let player = new Player();    
    
    spyOn(player, 'placeBets').and.callThrough();
    spyOn(game.table, 'resolveBets').and.callThrough();
    spyOn(game.table, 'rollDice').and.callThrough();

    game.registerPlayers([player]);
    game.playHand();

    expect(player.placeBets).toHaveBeenCalledTimes(1);
    expect(game.table.rollDice).toHaveBeenCalledTimes(1);
    expect(game.table.dice.rollHistory.length).toBeGreaterThan(dieRollCount);
    expect(game.table.resolveBets).toHaveBeenCalledTimes(1);

  });

  it('should stop the game after x rolls', () => {
    let player = new Player();
    player.bankRoll = 100;
    game.registerPlayers([player]);
    spyOn(game, 'playHand').and.stub();
    game.startGame(2);
    expect(game.playHand).toHaveBeenCalledTimes(2);
  });

  it('should indicate stop if no players have money', () => {
    let player = new Player();
    player.bankRoll = 10;
  
    expect(game.keepPlaying([player], 10)).toBe(true);

    player.bankRoll = 0;
    expect(game.keepPlaying([player], 10)).toBe(false);
  });
  
  
  it('should stop the game when all players are out of money', () => {
    let player = new Player();
    player.bankRoll = 10;
    spyOn(game, 'playHand').and.callFake(() =>{
      player.bankRoll = 0;
    });
    
    game.registerPlayers([player]);
    game.startGame(20);
    expect(game.playHand).toHaveBeenCalledTimes(1);
  });
})