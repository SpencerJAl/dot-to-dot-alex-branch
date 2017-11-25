import { Component, OnInit } from '@angular/core';


import{ProjectFilterDataService} from "../project-filter/project-filter-data.service";



@Component({
  selector: 'app-map-layers',
  templateUrl: './map-layers.component.html',
  styleUrls: ['./map-layers.component.scss']
})
export class MapLayersComponent implements OnInit {
  previousUse:boolean;
  vacantSite:boolean;
  supplierNetwork:boolean;
  events:boolean;
  foodNetwork:boolean;

  constructor(private projectFilterData:ProjectFilterDataService) {  }

  ngOnInit() {
    this.projectFilterData.currentPrevious.subscribe(previousUse => this.previousUse =previousUse);
    this.changePreviousFlag(false);
    this.projectFilterData.currentVacant.subscribe(vacantSite => this.vacantSite = vacantSite);
    this.changeSitesFlag(false);
    this.projectFilterData.currentSupplier.subscribe(  supplierNetwork => this.  supplierNetwork =   supplierNetwork);
    this.changeSuppliersFlag(false);
    this.projectFilterData.currentFood.subscribe(foodNetwork => this.foodNetwork = foodNetwork);
    this.changeFoodFlag(false);
    this.projectFilterData.currentEvent.subscribe(events => this.events = events);
    this.changeEventsFlag(false);
  }

  changePreviousFlag(Flag:boolean) {
    this.projectFilterData.changePrevious(Flag);

  }
  changeEventsFlag(Flag:boolean) {
    this.projectFilterData.changeEvent(Flag);

  }
  changeSitesFlag(Flag:boolean) {
    this.projectFilterData.changeVacant(Flag);

  }
  changeFoodFlag(Flag:boolean) {
    this.projectFilterData.changeFood(Flag);

  }
  changeSuppliersFlag(Flag:boolean) {
    this.projectFilterData.changeSupplier(Flag);

  }

}
