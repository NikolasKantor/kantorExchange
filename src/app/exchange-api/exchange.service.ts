import { Injectable } from '@angular/core';
import { ActiveCurrencies } from '../tab1/active-currencies.model';
import { Subject } from 'rxjs/internal/Subject';
import { CurrencyRate } from '../common/currency-rate.model';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  token:string = 'D8BF6BB698C443EB975EE04AEC58BAB6';

  activeCurrencies: ActiveCurrencies;
  exchangeRates: CurrencyRate;

  activeCurrenciesUpdated = new Subject<ActiveCurrencies>();
  exchangeRateLoaded = new Subject<CurrencyRate>();

  constructor(private http:HTTP) { }

  loadExchangeRate(inputCurrencyCode: string, outputCurrencyCode: string){
    this.http.get('https://globalcurrencies.xignite.com/xGlobalCurrencies.json/GetRealTimeRate?Symbol=' + inputCurrencyCode + outputCurrencyCode + '&_token=' + this.token, {}, {})
      .then(response => {
          let currencyRate:CurrencyRate = <CurrencyRate>JSON.parse(response.data);
          this.exchangeRates = currencyRate;
          this.exchangeRateLoaded.next(currencyRate);
      }).catch(error => {
        console.log("getRealTimeRate error, ", error)
      });
  }

  loadActiveCurrencies(){
    this.http.get('https://globalcurrencies.xignite.com/xGlobalCurrencies.json/ListActiveCurrencies?&_token=' + this.token, {}, {})
    .then(response => {     
        let activeCurrecies:ActiveCurrencies = <ActiveCurrencies>JSON.parse(response.data);
        this.activeCurrencies = activeCurrecies;
        this.activeCurrenciesUpdated.next(activeCurrecies);
      }).catch( error => {
        console.log("getActiveCurrencies error, ", error)
      });
  }

  getActiveCurrencies(){
    return this.activeCurrencies;
  }

  getExchangeRates(){
    return this.exchangeRates;
  }

}
