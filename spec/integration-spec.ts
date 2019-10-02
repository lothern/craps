import { CrapsGame } from "../src/craps-game";
import { Player } from "../src/player";
import { TableMaker } from "./table-maker/table-maker";
import { RiggedDice } from "./dice/rigged-dice";

describe('Integration Tests: ', () => {

  it('should allow a player to play and win passline', () => {
    let player = new Player();
    player.bankRoll = 10;
    spyOn(player, 'placeBets').and.callThrough();
    
    // Setup a table that will estabish a point and make
    // that point right awau.
    const diceRolls = [4, 4];
    let table = TableMaker.getTable().withRiggedDice(diceRolls).value();
    spyOn(table, 'rollDice').and.callThrough();

    let game = new CrapsGame();    
    game.table = table;
    
    game.registerPlayers([player]);
    expect(game.players).toEqual([player]);
    expect(table.bettors.length).toBe(1);
    

    // Manually play two hands
    // Hand 1
    game.playHand();
    expect(table.isPointOn).toBe(true);
    expect(table.getLastRoll()).toBe(diceRolls[0]);
    expect(table.currentPoint).toBe(diceRolls[0]);
    expect(player.bankRoll).toBe(0);
    
    expect(game.keepPlaying([player], table, 1)).toBe(true);

    // Hand 2
    game.playHand();
    expect(table.isPointOn).toBe(false);
    expect(table.getLastRoll()).toBe(diceRolls[1]);
    expect(table.currentPoint).toBeUndefined();

    expect(table.rollDice).toHaveBeenCalledTimes(2);
    expect(player.placeBets).toHaveBeenCalledTimes(2);
    expect(player.bankRoll).toBe(20);
  });

  it('should take a players money if they seven out', () => {
    let player = new Player();
    player.bankRoll = 100;

    const diceRolls = [6, 5, 4, 7];
    let table = TableMaker.getTable().withRiggedDice(diceRolls).value();

    let game = new CrapsGame();
    game.table = table;

    game.registerPlayers([player]);
    
    // Hand #1 - Roll 6
    game.playHand();
    expect(table.currentPoint).toBe(diceRolls[0]);
    expect(game.table.getLastRoll()).toBe(diceRolls[0]);
    expect(table.isPointOn).toBe(true);
    expect(player.bankRoll).toBe(90);

    // Hand #2 - Roll 5 - Nothing should change.
    game.playHand();
    expect(game.table.getLastRoll()).toBe(diceRolls[1]);
    expect(table.currentPoint).toBe(diceRolls[0]);
    expect(table.isPointOn).toBe(true);
    expect(player.bankRoll).toBe(90);

    // Hand #3 - Roll 4 - Nothing should change.
    game.playHand();
    expect(game.table.getLastRoll()).toBe(diceRolls[2]);
    expect(table.currentPoint).toBe(diceRolls[0]);
    expect(table.isPointOn).toBe(true);
    expect(player.bankRoll).toBe(90);
    
    // Hand #4 - Roll 7 - SEVEN OUT.
    game.playHand();
    expect(table.getLastRoll()).toBe(diceRolls[3]);
    let dice = table.dice as RiggedDice;
    expect(dice.rollQueue.length).toBe(0);
    expect(table.currentPoint).toBeUndefined();
    expect(table.isPointOn).toBe(false);
    expect(table.bets.length).toBe(0);
    expect(player.bankRoll).toBe(90);
  })
});