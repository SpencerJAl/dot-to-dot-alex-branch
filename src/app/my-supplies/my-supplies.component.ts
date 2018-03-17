import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AF} from '../providers/af';

@Component({
  selector: 'app-my-supplies',
  templateUrl: './my-supplies.component.html',
  styleUrls: ['./my-supplies.component.scss']
})
export class MySuppliesComponent implements OnInit {


  constructor( private afService: AF, private db: AngularFireDatabase) {
   // this. mySuppliers = db.list('registeredUsers/' );
  }

  ngOnInit() {
  }

}
