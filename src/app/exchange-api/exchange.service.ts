import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActiveCurrencies } from '../tab1/active-currencies.model';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  token:string = '264B716C49FF4D8A8E5817FC3FB00E42';

  activeCurrencies: ActiveCurrencies;
  activeCurrenciesUpdated = new Subject<ActiveCurrencies>();

  constructor(private httpClient:HttpClient) { }

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


}
