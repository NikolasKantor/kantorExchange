export class Rates{
    bid: number;
    mid: number;
    ask: number;

    constructor(bid: number, mid: number, ask: number){
        this.bid = bid;
        this.mid = mid;
        this.ask = ask;
    }
}