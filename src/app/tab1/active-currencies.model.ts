import { Currency } from "../common/currency.model";

export class ActiveCurrencies {
    delay: number;
    outcome: string;
    currencyList: Currency[];
    identity: string;
    message: string;

    counstructor(delay: number, outcome: string, currencyList: Currency[], identity: string, message: string){
        this.delay = delay;
        this.outcome = outcome;
        this.currencyList = currencyList;
        this.identity = identity;
        this.message = message;
    }
}