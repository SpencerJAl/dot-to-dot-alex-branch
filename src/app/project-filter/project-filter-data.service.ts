import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ProjectFilterDataService {

  private artSource = new BehaviorSubject<boolean>(true);
  currentArt = this.artSource.asObservable();
  private scienceSource = new BehaviorSubject<boolean>(true);
  currentSci = this.scienceSource.asObservable();
  private healthSource = new BehaviorSubject<boolean>(true);
  currentHealth = this.healthSource.asObservable();
  private eduSource = new BehaviorSubject<boolean>(true);
  currentEdu = this.eduSource.asObservable();
  private craftSource = new BehaviorSubject<boolean>(true);
  currentCraft = this.craftSource.asObservable();


  private previousSource = new BehaviorSubject<boolean>(true);
  currentPrevious = this.previousSource.asObservable();

  private supplierSource = new BehaviorSubject<boolean>(true);
  currentSupplier = this.supplierSource.asObservable();
  private eventSource = new BehaviorSubject<boolean>(true);
  currentEvent = this.eventSource.asObservable();

  private foodSource = new BehaviorSubject<boolean>(true);
  currentFood = this.foodSource.asObservable();
  private vacantSource = new BehaviorSubject<boolean>(true);
  currentVacant = this.vacantSource.asObservable();

  constructor() {}

  changeVacant(Flag: boolean) {
    this.vacantSource.next(Flag);
  }
  changeFood(Flag: boolean) {
    this.foodSource.next(Flag);
  }
  changePrevious(Flag: boolean) {
    this.previousSource.next(Flag);
  }
  changeEvent(Flag: boolean) {
    this.eventSource.next(Flag);
  }
  changeSupplier(Flag: boolean) {
    this.supplierSource.next(Flag);
  }
  changeCraft(craftFlag: boolean) {
    this.craftSource.next(craftFlag);
  }
  changeEdu(eduFlag: boolean) {
    this.eduSource.next(eduFlag);
  }
  changeArt(artFlag: boolean) {
    this.artSource.next(artFlag);
  }
  changeScience(sciFlag: boolean) {
    this.scienceSource.next(sciFlag);
  }
  changeHealth(healthFlag: boolean) {
    this.healthSource.next(healthFlag);
  }
}
