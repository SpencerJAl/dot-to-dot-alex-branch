import { Component, OnInit } from '@angular/core';
import { AppComponent} from '../app.component';
import {AppRouting} from "../app.routing";
import {AF} from "../providers/af";
import {Router, ActivatedRoute} from "@angular/router";
import {FirebaseListObservable, FirebaseObjectObservable, AngularFire} from "angularfire2/index";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  error:any;
  project:FirebaseObjectObservable<any>;

  //this is currently a work around because of problems subscribing for some reason, will be fixed later
  projects:FirebaseListObservable<any>;

  constructor(private afService: AF, private router: Router,af:AngularFire, private route: ActivatedRoute ){
   this.project=af.database.object('projects/'+ this.route.snapshot.params['id']);
  }
  

  id:string;
  private sub: any;

  ngOnInit() {
    this.id= this.route.snapshot.params['id'];
      console.log("params are" +this.id);
  }
  join(){
    this.afService.join(this.id).then(()=>{
      this.router.navigate(['/']);
    }).catch((error) => {
      this.error = error;
      console.log(this.error);
    });
  }

}
