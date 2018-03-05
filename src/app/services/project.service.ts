import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {project} from '../providers/af';

@Injectable() export class ProjectService {
  constructor(public af: AngularFireDatabase) {
  }
  // accepts a users donation
  acceptDonation(projectId, notificationID) {
    this.af.object('projects/' + projectId + '/notifications/' + notificationID).update({accepted: true});
  };
  declineDonation() {};
}
