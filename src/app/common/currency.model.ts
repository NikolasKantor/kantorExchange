import { Country } from "./country.model";

export class Currency {
    Digital: boolean;
    Active: boolean;
    Countries: Country[];
    Message: string;
    Plural: string;
    Name: string;
    Symbol: String;

    constructor(digital: boolean, active: boolean, countries: Country[], message: string, plural: string, name: string, symbol: string){
        this.Digital = digital;
        this.Active = active;
        this.Countries = countries;
        this.Message = message;
        this.Plural = plural;
        this.Name = name;
        this.Symbol = symbol;
    }
}