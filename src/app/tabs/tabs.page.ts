import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { ExchangeService } from '../exchange-api/exchange.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  constructor(private storageService:StorageService, private exchangeService:ExchangeService){}

  ngOnInit(){
    this.storageService.loadOptions();
    this.exchangeService.loadActiveCurrencies();
  }
}
