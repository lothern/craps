export enum BetTypes {
  PassLine,
};

/**
 *  Pass line or come line bet
 */
export class Bet {

  amount: number = 0;
  payOut: number;
  player: string;
  oddsAmount: number = 0;
  point: number = undefined;

  constructor(amount: number, playerId: string) {
    this.amount = amount;
    this.player = playerId;
  }

  lose() {
    this.amount = 0;
    this.oddsAmount = 0;
  }

  //Pays: 2:1 on 4, 10; 3:2 on 5, 9; 6:5 on 6,8
  win() {
    this.payOut = this.amount;
    if (this.point) {
      this.payOut += Bet.computeOddsPayout(this);
    }
  }

  static computeOddsPayout(bet: Bet): number {
    if (!bet.oddsAmount) {
      return 0;
    }
    switch (bet.point) {
      case 4:
      case 10:
        return bet.oddsAmount * 2;
        break;
      case 5:
      case 9:
        return Math.floor(bet.oddsAmount / 2) * 3;
        break;
      case 6:
      case 8:
        return Math.floor(bet.oddsAmount / 5) * 6;
        break;
    }
  }
}