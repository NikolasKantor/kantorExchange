import { Currency } from "../common/currency.model";

export class ActiveCurrencies {
    Delay: number;
    Outcome: string;
    CurrencyList: Currency[];
    Identity: string;
    Message: string;

    counstructor(delay: number, outcome: string, currencyList: Currency[], identity: string, message: string){
        this.Delay = delay;
        this.Outcome = outcome;
        this.CurrencyList = currencyList;
        this.Identity = identity;
        this.Message = message;
    }
}