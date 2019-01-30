import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Options } from '../tab3/options.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  options: Options;

  constructor(private storageService: StorageService) {}

  ngOnInit(){
    this.options = this.storageService.getOptions();
    this.storageService.retrievedOptions.subscribe(
      (options: Options) => {this.options = options},
      error => console.error('could retrieve data')
    );

    
  }

}
