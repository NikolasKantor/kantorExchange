import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Options } from '../tab3/options.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { CurrencyCode } from '../common/currecy-code.model';
import { ExchangeService } from '../exchange-api/exchange.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  retrievedOptions = new Subject<Options>();
  options: Options = {
    input: new CurrencyCode('CZK', 'Czech koruna'),
    output: new CurrencyCode('EUR', 'European Union euro'),
    displayMode: "fullName",
    rates: {
      bid: true,
      mid: true,
      ask: true,
    }
  };

  constructor(private nativeStorage: NativeStorage, private exchangeService: ExchangeService) {}

  saveOptions(options: Options){
    this.nativeStorage.setItem('options', options).then(
      () => {
        console.log('options were successfully saved');
      },
      error => console.error('error saving options', error)
    );
    this.retrievedOptions.next(new Options(undefined, undefined, options.displayMode, options.rates.bid, options.rates.mid, options.rates.ask));
  }

  loadOptions(){
    this.nativeStorage.getItem('options').then(
      (options: Options) => {
        this.options = options;
        this.retrievedOptions.next(options);
        this.exchangeService.loadExchangeRate(options.input.code, options.output.code);
      },
      error => console.error('error loading options', error)
    );
  }

  getOptions(): Options{
    return this.options;
  }

}
