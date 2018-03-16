import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {Injectable} from '@angular/core';

@Injectable()
export class DonationsService {
  donation: FirebaseObjectObservable<any>;
  d;
  newAmmount;
  constructor(private af: AngularFireDatabase) {}
  setDonation(amount, project, id, did) {
    this.newAmmount = amount;
    this.donation = this.af.object('projects/' + project + '/itemsWanted/' + id);
    this.donation.subscribe((e) => {
      this.d = e;
    });
    this.af.object('projects/' + project + '/donations/' + did).update({
      accepted: true
    });
  }
  acceptDonation() {
    const currentAmount = this.d.currentAmoun + this.newAmmount;
    this.donation.update({
      currentAmount: currentAmount,
    });
  }

}
