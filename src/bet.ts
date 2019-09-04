export enum BetTypes {
  PassLine,
};

export class Bet {
  
  amount: number = 0;
  payOut: number;
  player: string;
  oddsAmount: number = 0;
  
  constructor(amount: number, playerId: string)  {
    this.amount = amount;
    this.player = playerId;
  }
  
  lose() {
    
  }
  
  //Pays: 2/1 on 4, 10; 3/2 on 5, 9; 6/5 on 6,8
  win() {
    this.payOut = this.amount;
  }
  
  computeOddsPayout(point: number): number {
    switch (point) {
      case 4:
      case 10:
        return this.oddsAmount * 2;
        break;
      case 5:
      case 9:
        return Math.floor(this.oddsAmount / 2) * 3;
        break;
      case 6:
      case 8:
        return Math.floor(this.oddsAmount / 5) * 6;
        break;       
    }
  }
}