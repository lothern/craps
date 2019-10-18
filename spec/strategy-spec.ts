import { Strategy } from "../src/strategy";

describe('Strategy', () =>{
  let strategy : Strategy;
  beforeEach(() => {
    strategy = new Strategy();
  });

  it('should contain more than one bet', () => {
    let emptyBetArray : BaseBet[] = [];
    expect(strategy.bets).toEqual(emptyBetArray);
    expect(strategy.toPlace).toEqual(emptyBetArray)
  });
});