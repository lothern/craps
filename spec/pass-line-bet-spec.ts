import { PassLineBet } from "../src/bets/pass-line-bet";
import { TableMaker } from "./table-maker/table-maker";

describe('PassLineBet', () => {
  it('should pay pass line only bets', () => {
    let bets = [1,10,15,20];
    let testBets = function(betAmount: number) {
      let table = TableMaker.getTable().value();
      let passLineBet = new PassLineBet(betAmount, 'player1');
      passLineBet.oddsAmount = 0;
      passLineBet.win(table);
      expect(passLineBet.payOut).toBe(betAmount);
    }
    bets.forEach(testBets);
  });

  it('should indicate okToPlace only when the point is off', () =>{
    let table = TableMaker.getTable().withPoint(10).value();
    expect(PassLineBet.isOkayToPlace(table)).toBe(false);

    table = TableMaker.getTable().value();
    expect(PassLineBet.isOkayToPlace(table)).toBe(true);
  });
 
  it('should compute odds payout based on point', () => {
    let betAmount = 10;
    let oddsAmount = 20;

    let testOddsPay = function(point: number, payOut: number) {
      let bet = new PassLineBet(betAmount, 'player1');
      let table = TableMaker.getTable().withPoint(point).value();
      bet.oddsAmount = oddsAmount;
      bet.point = point;
      expect(PassLineBet.computeOddsPayout(bet, table)).toBe(payOut);
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
  });

  it('should payout for a 6 or 8', () => {
    let bet = new PassLineBet(10, 'player1');
    let table = TableMaker.getTable().withPoint(6).value();
    bet.point = 6;
    bet.oddsAmount = 20;
    bet.win(table);
    expect(bet.payOut).toBe(10 + 24)

    bet.point = 8;
    table.currentPoint = 8;
    bet.win(table);
    expect(bet.payOut).toBe(10 + 24)
  });

  it('should payout for a 5 or 9', () => {
    let bet = new PassLineBet(10, 'player1');
    let table = TableMaker.getTable().withPoint(5).value();
    bet.point = 5;
    bet.oddsAmount = 20;
    bet.win(table);
    expect(bet.payOut).toBe(10 + 30)

    bet.point = 9
    table.currentPoint = 9;
    bet.win(table);
    expect(bet.payOut).toBe(10 + 30)
  });
  
  it('should payout for a 4 or 10', () => {
    let bet = new PassLineBet(10, 'player1');
    let table = TableMaker.getTable().withPoint(10).value();
    bet.point = 4;
    bet.oddsAmount = 20;
    bet.win(table);
    expect(bet.payOut).toBe(10 + 40)

    table.currentPoint = 10;
    bet.point = 10;
    bet.win(table);
    expect(bet.payOut).toBe(10 + 40)
  });

  it('should zero out a bet when loses', () => {
    let bet = new PassLineBet(10, 'player1');
    bet.lose()
    expect(bet.amount).toBe(0);
    expect(bet.oddsAmount).toBe(0);
  });

  it('should NOT payout odds if there is no point', () => {
    let bet = new PassLineBet(10, 'player1');
    let table = TableMaker.getTable().withPoint(10).value();
    bet.oddsAmount = 20;
    bet.win(table);
    expect(bet.payOut).toBe(10);
  });

  it('should pay even money on 7/11', ()  => {
    let table = TableMaker.getTable().value();
    let bet = new PassLineBet(10, 'player');
    bet.win(table);

    expect(bet.payOut).toBe(10);
  });
});