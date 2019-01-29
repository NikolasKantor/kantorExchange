import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  token:string = '264B716C49FF4D8A8E5817FC3FB00E42';

  constructor(private httpClient:HttpClient) { }

  getActiveCurrencies(){
    this.httpClient.get('https://globalcurrencies.xignite.com/xGlobalCurrencies.json/ListActiveCurrencies?&_token=' + this.token).subscribe(
      data => console.log("getActiveCurrencies data, ", data),
      error => console.log("getActiveCurrencies error, ", error)
    );
  }

  getCurrencies(){
    this.httpClient.get('https://globalcurrencies.xignite.com/xGlobalCurrencies.json/ListCurrencies?&_token=' + this.token).subscribe(
      data => console.log("getCurrencies data, ", data),
      error => console.log("getCurrencies error, ", error)
    );
  }

}
