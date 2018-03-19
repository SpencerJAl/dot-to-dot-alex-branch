import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

@Injectable()
export class SuppliersService {
  donation: FirebaseObjectObservable<any>;
  d;
  newAmmount;
  constructor(private af: AngularFireDatabase) { }

  setDonation(amount, project, id, did) {
    this.newAmmount = amount;
    this.donation = this.af.object('suppliers/' + project + '/supplies/' + id);
    this.donation.subscribe((e) => {
      this.d = e;
    });
    this.af.object('suppliers/' + project + '/collectors/' + did).update({
      accepted: true
    });
  }
  acceptDonation() {
    const currentAmount = Number(this.d.currentAmount) - Number(this.newAmmount);
    this.donation.update({
      currentAmount: currentAmount,
    });
  }
}
