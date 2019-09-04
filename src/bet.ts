export class Bet {
 
  amount: number = 0;
  payOut: number;
  player: string;

  constructor(amount: number, playerId: string)  {
    this.amount = amount;
    this.player = playerId;
  }

  lose(bet: Bet) {
    
  }

  win(bet: Bet) {
    
  }
}