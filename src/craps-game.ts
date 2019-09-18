import { CrapsTable } from "./craps-table";
import { Player } from "./player";
import * as _ from 'lodash';

export class CrapsGame {
  
  table : CrapsTable;
  players: Player[];
  
  constructor() {
    this.table = new CrapsTable;
    this.players = [];
  }

  registerPlayers(newPlayers: Player[]) {
    let self = this;
    newPlayers.forEach(player => {
      this.table.onPlaceBets(player.placeBets);
      this.players.push(player);
    }); 
  }

  startGame(rollsToPlay : number) : void {
    while (this.keepPlaying(this.players, rollsToPlay)) {
      this.playHand();
      rollsToPlay--;
    } 
  }

  keepPlaying(players : Player[], rollsToPlay : number) : boolean {
    // Look for one player for money.
    let playerWithMoney = _.find(players, player => {
      return player.bankRoll > 0;
    });

    return !!playerWithMoney && rollsToPlay > 0;
  }

  playHand() : void {
    this.placeBets();
    this.table.rollDice();
  }

  placeBets() : void {
    this.players.forEach(player => {
      player.placeBets(this.table);
    });
  }
}