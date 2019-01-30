import { Country } from "./country.model";

export class Currency {
    digital: boolean;
    active: boolean;
    countries: Country[];
    message: string;
    plural: string;
    name: string;
    symbol: String;

    constructor(digital: boolean, active: boolean, countries: Country[], message: string, plural: string, name: string, symbol: string){
        this.digital = digital;
        this.active = active;
        this.countries = countries;
        this.message = message;
        this.plural = plural;
        this.name = name;
        this.symbol = symbol;
    }
}