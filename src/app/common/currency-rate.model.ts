export class CurrencyRate{
    Spread: number;
    Ask: number;
    Mid: number;
    Bid: number;
    Delay: number;
    Outcome: string;
    Source: string;
    Text: string;
    QuoteType: string;
    Time: string;
    Date: string;
    Symbol: string;
    QuoteCurrency: string;
    BaseCurrency: string;
    Identity: string;
    Message: string;

    constructor(spread: number, ask: number, mid: number, bid: number, delay: number,
        outcome: string, source: string, text: string, quoteType: string, time: string, 
        date: string, symbol: string, quoteCurrency: string, baseCurrency: string, identity: string, message: string){
            this.Spread = spread;
            this.Ask = ask;
            this.Mid = mid;
            this.Bid = bid;
            this.Delay = delay;
            this.Outcome = outcome;
            this.Source = source;
            this.Text = text;
            this.QuoteType = quoteType;
            this.Time = time;
            this.Date = date;
            this.Symbol = symbol;
            this.QuoteCurrency = quoteCurrency;
            this.BaseCurrency = baseCurrency;
            this.Identity = identity;
            this.Message = message;
        }

}