import { Strategy } from "../src/strategy";
import { BaseBet } from "../src/bets/base-bet";
import { PassLineBet } from "../src/bets/pass-line-bet";
import { ComeBet } from "../src/bets/come-bet";

describe("Strategy", () => {
  let strategy: Strategy;
  beforeEach(() => {
    strategy = new Strategy();
  });

  it("should contain more than one bet", () => {
    let emptyBetArray: BaseBet[] = [];
    expect(strategy.bets).toEqual(emptyBetArray);
    expect(strategy.toPlace).toEqual(emptyBetArray);
  });

  it("should take a bet array and output a queue of bets to place", () => {
    let passLineBet = new PassLineBet(10, "player1");
    let comeBet = new ComeBet(10, "player1");
    let playerBets: BaseBet[] = [passLineBet];

    strategy.bets = [passLineBet as BaseBet, comeBet as BaseBet];
    let output = strategy.getBetsToPlace(playerBets);
    expect(output).toEqual([comeBet]);
  });
});
