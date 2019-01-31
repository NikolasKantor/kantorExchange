import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Options } from '../tab3/options.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { CurrencyCode } from '../common/currecy-code.model';

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

  constructor(private nativeStorage: NativeStorage) {}

  saveOptions(options: Options){
    console.log('saving options: ',options);
    this.nativeStorage.setItem('options', options).then(
      () => {
        console.log('options saved!')
        this.retrievedOptions.next(options);
      },
      error => console.error('error saving options', error)
    );
    this.retrievedOptions.next(options);
  }

  loadOptions(){
    console.log('loading options from memory');
    this.nativeStorage.getItem('options').then(
      (options: Options) => {
        console.log('successfully loaded options! ',options);
        this.options = options;
        this.retrievedOptions.next(options);
      },
      error => console.error('error loading options', error)
    );
  }

  getOptions(): Options{
    return this.options;
  }

}
