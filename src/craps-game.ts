import { CrapsTable } from "./craps-table";
import { Player } from "./player";

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

  startGame() : void {
    this.placeBets();
  }

  placeBets() : void {
    this.players.forEach(player => {
      player.placeBets(this.table);
    });
  }
  
}