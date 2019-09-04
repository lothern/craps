import { Bet, BetTypes } from "../src/bet";
import { NumericDictionary } from "lodash";

describe('bet', () => {
  it('should pay pass line and odds', () => {
    let bets = [1,10,15,20];
    let testBets = function(betAmount: number) {
      let passLineBet = new Bet(betAmount, 'player1');
      passLineBet.win();
      expect(passLineBet.payOut).toBe(betAmount);
    }
    bets.forEach(testBets);
  });
 
  
  it('should compute odds payout based on point', () => {
    let point: number = 6;
    let betAmount = 10;
    let oddsAmount = 20;

    let testOddsPay = function(point: number, payOut: number) {
      let bet = new Bet(betAmount, 'player1');
      bet.oddsAmount = oddsAmount;
      bet.point = point;
      expect(Bet.computeOddsPayout(bet)).toBe(payOut);
    }

    // 6:5 odds payout.
    testOddsPay(6, 24);
    testOddsPay(8, 24);

    // 3:2 odds payout.
    testOddsPay(5, 30);
    testOddsPay(9, 30);

    // 2:1 odds payout.
    testOddsPay(4, 40);
    testOddsPay(10, 40);
  })

  // it('should payout for a 6 or 8', () => {
  //   let bet = new Bet(10, 'player1');
  //   bet.win();
  //   expect(bet.payOut).toBe()
  // });
});