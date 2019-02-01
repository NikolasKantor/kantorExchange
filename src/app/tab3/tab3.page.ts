import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Options } from './options.model';
import { ExchangeService } from '../exchange-api/exchange.service';
import { Currency } from '../common/currency.model';
import { ActiveCurrencies } from '../tab1/active-currencies.model';
import { Subscription } from 'rxjs';
import { CurrencyCode } from '../common/currecy-code.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy{
  inputCurrency: CurrencyCode;
  outputCurrency: CurrencyCode;
  currencyDiplayMode: string;
  bidRate: boolean;
  midRate: boolean;
  askRate: boolean;
  currencies: Currency[];

  activeCurrenciesSubscription: Subscription;
  optionsSubscription: Subscription;

  constructor(private storageService: StorageService, private exchangeService: ExchangeService){}

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
      error*/
    );
    this.updateOptionsTab(this.storageService.getOptions());
    this.optionsSubscription = this.storageService.retrievedOptions.subscribe(
      (options: Options) => this.updateOptionsTab(options),
      error => console.error('error while retrieving options')
    );
  }

  updateOptionsTab(options: Options){
    this.inputCurrency = options.input != undefined ? options.input : this.inputCurrency;
    this.outputCurrency = options.output != undefined ? options.output : this.outputCurrency;
    this.currencyDiplayMode = options.displayMode;
    this.bidRate = options.rates.bid;
    this.midRate = options.rates.mid;
    this.askRate = options.rates.ask;
  }

  onOptionsChange(){
    this.storageService.saveOptions(
      new Options(this.inputCurrency, this.outputCurrency, this.currencyDiplayMode, this.bidRate, this.midRate, this.askRate)
    );
  }

  ngOnDestroy(){
    this.activeCurrenciesSubscription.unsubscribe();
    this.optionsSubscription.unsubscribe();
  }
}
