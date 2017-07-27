import { Component, OnInit } from '@angular/core';
import { AppComponent} from '../app.component';
import {AppRouting} from "../app.routing";
import {AF} from "../providers/af";
import {Router, ActivatedRoute} from "@angular/router";
import {FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  error:any;
  project:FirebaseObjectObservable<any>;
  id:string;
  isMember:boolean;

  //this is currently a work around because of problems subscribing for some reason, will be fixed later
  projects:FirebaseListObservable<any>;
  projectData:{};
  messages:FirebaseListObservable<any>;
  userID;

  constructor(private afService: AF, private router: Router,af:AngularFireDatabase, private route: ActivatedRoute ){
   this.project=af.object('projects/'+ this.route.snapshot.params['id']);
    this.messages=af.list('projects/'+ this.route.snapshot.params['id']+'messages');
    this.project.subscribe((p)=>{
      this.projectData=p;
      //for (m in p.members){
       // console.log (m.id)
     // }
    });
    this.userID=afService.userID;
  }

  ngOnInit() {
    this.id= this.route.snapshot.params['id'];
      console.log("params are" +this.id);
  }

  //FUNCTION CALL TO MAKE USER JOIN A PROJECT
  join(){
    this.afService.join(this.id).then(()=>{
      this.router.navigate(['/']);
    }).catch((error) => {
      this.error = error;
      console.log(this.error);
    });
  }

  postUpdate(){}

}
