export class Options{
    input: string;
    output: string;
    displayMode: string;
    rates: {
        bid: boolean;
        mid: boolean;
        ask: boolean;
    }

    constructor(input: string, output: string, displayMode: string, bidRate: boolean, midRate: boolean, askRate: boolean){
        this.input = input;
        this.output = output;
        this.displayMode = displayMode;
        this.rates = {
            bid: bidRate,
            mid: midRate,
            ask: askRate
        }
    }
}