import { Component, OnInit } from '@angular/core';
import {AF} from '../providers/af';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-supplier-request',
  templateUrl: './supplier-request.component.html',
  styleUrls: ['./supplier-request.component.scss']
})
export class SupplierRequestComponent implements OnInit {

  id: string;
  project: FirebaseObjectObservable<any>;
  proj;



  constructor(private afService: AF, private af: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    this.project = af.object('supplierRequests/' + this.route.snapshot.params['id']);

    this.project.subscribe((p) => {
      this.proj = p;
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log('params are' + this.id);
  }

  approve() {
    alert('approved');
    console.log('thing being passed name is ' + this.proj);

    this.afService.supplierApprove(this.proj, this.id).then(() => {
      this.router.navigate(['/adminDashboard']);
    });
  }

  decline() {
    alert('declined');
    this.afService.projectDecline(this.id).then(() => {
      this.router.navigate(['/adminDashboard']);
    });
  }

  test() {
    alert('The project is ' + this.proj.name);
  }


}
