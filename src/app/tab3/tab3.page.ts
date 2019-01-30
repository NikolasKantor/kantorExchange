import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Options } from './options.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  inputCurrency: string;
  outputCurrency: string;
  currencyDiplayMode: string;
  bidRate: boolean;
  midRate: boolean;
  askRate: boolean;

  constructor(private storageService: StorageService){}

  ngOnInit(){
    this.updateOptionsTab(this.storageService.getOptions());
    this.storageService.retrievedOptions.subscribe(
      (options: Options) => this.updateOptionsTab(options),
      error => console.error('error while retrieving options')
    );
  }

  updateOptionsTab(options: Options){
    this.inputCurrency = options.input;
    this.outputCurrency = options.output;
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
}
