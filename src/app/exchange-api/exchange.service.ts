import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActiveCurrencies } from '../tab1/active-currencies.model';
import { Subject } from 'rxjs/internal/Subject';
import { CurrencyRate } from '../common/currency-rate.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  token:string = 'D8BF6BB698C443EB975EE04AEC58BAB6';

  activeCurrencies: ActiveCurrencies;
  exchangeRates: CurrencyRate;

  activeCurrenciesUpdated = new Subject<ActiveCurrencies>();
  exchangeRateLoaded = new Subject<CurrencyRate>();

  constructor(private httpClient:HttpClient) { }

  loadExchangeRate(inputCurrencyCode: string, outputCurrencyCode: string){
    console.log('loadExchangeRates');
    this.httpClient.get('https://globalcurrencies.xignite.com/xGlobalCurrencies.json/GetRealTimeRate?Symbol=' + inputCurrencyCode + outputCurrencyCode + '&_token=' + this.token).subscribe(
      (currencyRates: CurrencyRate) => {
        this.exchangeRates = currencyRates;
        this.exchangeRateLoaded.next(currencyRates);
      },
      error => {console.log("getRealTimeRate error, ", error)}
    );
  }

  loadActiveCurrencies(){
    this.httpClient.get('https://globalcurrencies.xignite.com/xGlobalCurrencies.json/ListActiveCurrencies?&_token=' + this.token).subscribe(
    (activeCurrencies: ActiveCurrencies) => {
        console.log("getActiveCurrencies data, ", activeCurrencies),
        this.activeCurrencies = activeCurrencies;
        this.activeCurrenciesUpdated.next(activeCurrencies);
      },
      error => {console.log("getActiveCurrencies error, ", error)}
    );
  }

  getActiveCurrencies(){
    return this.activeCurrencies;
  }

  getExchangeRates(){
    return this.exchangeRates;
  }


}
