import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Options } from '../tab3/options.model';
import { ExchangeService } from '../exchange-api/exchange.service';
import { ActiveCurrencies } from './active-currencies.model';
import { Subscription } from 'rxjs';
import { Currency } from '../common/currency.model';
import { CurrencyCode } from '../common/currecy-code.model';
import { Rates } from '../common/rates.model';
import { CurrencyRate } from '../common/currency-rate.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{
  options: Options;
  currencies: Currency[];
  amount: number;
  rates: Rates = new Rates(0, 0, 0);


  activeCurrenciesSubscription: Subscription;
  optionsSubscription: Subscription;

  constructor(private storageService: StorageService, private exchangeService: ExchangeService) {}

  ngOnInit(){
    var activeCurrencies: ActiveCurrencies = this.exchangeService.getActiveCurrencies();
    if(activeCurrencies != undefined)
      this.currencies = activeCurrencies.CurrencyList;
    this.activeCurrenciesSubscription = this.exchangeService.activeCurrenciesUpdated.subscribe(
      (activeCurrencies: ActiveCurrencies) => {
        if(activeCurrencies != undefined){
          this.currencies = activeCurrencies.CurrencyList;
        }
      }/*,
      error => console.error('something doesnt work')*/
    );

    this.options = this.storageService.getOptions();
    this.optionsSubscription = this.storageService.retrievedOptions.subscribe(
      (options: Options) => {
        this.options.input = options.input != undefined ? options.input : this.options.input;
        this.options.output = options.output != undefined ? options.output : this.options.output;
        this.options.displayMode = options.displayMode;
        this.options.rates = options.rates;

        //this.options = options;
      }/*,
      error => console.error('something doesnt work')*/
    );

    let exchangeRate: CurrencyRate = this.exchangeService.getExchangeRates();
    if(exchangeRate != undefined){
      this.rates = new Rates(exchangeRate.Bid, exchangeRate.Mid, exchangeRate.Ask);
    }
    else{
      this.exchangeService.loadExchangeRate(this.options.input.code, this.options.output.code);
    }
    this.exchangeService.exchangeRateLoaded.subscribe(
      (exchangeRates: CurrencyRate) => {
        if(exchangeRates != undefined){
          console.log("exrs: ",exchangeRates);
          this.rates = new Rates(exchangeRates.Bid, exchangeRates.Mid, exchangeRates.Ask);
        }
      }
    )
  }

  onCurrencyChange(){
    this.exchangeService.loadExchangeRate(this.options.input.code, this.options.output.code);
  }

  onSwapClick(){
    let inputCurrencyCode:CurrencyCode = this.options.input;
    this.options.input = this.options.output;
    this.options.output = inputCurrencyCode;
  }
  
  ngOnDestroy(){
    this.activeCurrenciesSubscription.unsubscribe();
    this.optionsSubscription.unsubscribe();
  }

}
