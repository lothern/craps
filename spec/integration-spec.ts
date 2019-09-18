import { CrapsGame } from "../src/craps-game";
import { Player } from "../src/player";
import { TableMaker } from "./table-maker/table-maker";

xdescribe('Integration', () => {

  it('should allow a player to play and win passline', () => {
    let game = new CrapsGame();
    let player = new Player();
    player.bankRoll = 100;
    game.registerPlayers([player]);
    let table = TableMaker.getTable().withRiggedDice([4, 4]).value();
    game.table = table;
    game.startGame();

    expect(player.bankRoll).toBe(210);
  });
});