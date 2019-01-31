import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Options } from '../tab3/options.model';
import { ExchangeService } from '../exchange-api/exchange.service';
import { ActiveCurrencies } from './active-currencies.model';
import { Subscription } from 'rxjs';
import { Currency } from '../common/currency.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{
  options: Options;
  currencies: Currency[];

  activeCurrenciesSubscription: Subscription;
  optionsSubscription: Subscription;

  constructor(private storageService: StorageService, private exchangeService: ExchangeService) {}

  ngOnInit(){
    var activeCurrencies: ActiveCurrencies = this.exchangeService.getActiveCurrencies();
    console.log('current active currencies: ',activeCurrencies);
    if(activeCurrencies != undefined)
      this.currencies = activeCurrencies.CurrencyList;
    this.activeCurrenciesSubscription = this.exchangeService.activeCurrenciesUpdated.subscribe(
      (activeCurrencies: ActiveCurrencies) => {
        console.log('received updated currencies: ',activeCurrencies);
        if(activeCurrencies != undefined){
          this.currencies = activeCurrencies.CurrencyList;
        }
      }/*,
      error => console.error('something doesnt work')*/
    );

    this.options = this.storageService.getOptions();
    this.optionsSubscription = this.storageService.retrievedOptions.subscribe(
      (options: Options) => {
        console.log("tab1 received new options: ", options);
        this.options = options;
      }/*,
      error => console.error('something doesnt work')*/
    );
  }
  
  ngOnDestroy(){
    this.activeCurrenciesSubscription.unsubscribe();
    this.optionsSubscription.unsubscribe();
  }

}
