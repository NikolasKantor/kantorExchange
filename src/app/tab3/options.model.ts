import { CurrencyCode } from "../common/currecy-code.model";

export class Options{
    input: CurrencyCode;
    output: CurrencyCode;
    displayMode: string;
    rates: {
        bid: boolean;
        mid: boolean;
        ask: boolean;
    }

    constructor(input: CurrencyCode, output: CurrencyCode, displayMode: string, bidRate: boolean, midRate: boolean, askRate: boolean){
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