import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Injectable()
export class MarkersService {
 private ProjectID = new BehaviorSubject<string>("3");
 currentProjectID = this.ProjectID.asObservable();
  private ProjectName = new BehaviorSubject<string>("General");
  currentProjectName = this.ProjectName.asObservable();
  private ProjectType = new BehaviorSubject<string>("general");
  currentProjectType = this.ProjectName.asObservable();

  marker: FirebaseListObservable<any>;
  constructor() { }

  changeProjectID( nextProjectID : string ) {
    this.ProjectID.next(nextProjectID);
    console.log("Current Project ID " + nextProjectID);
  }

  changeProjectName( nextProjectName : string ){
      this.ProjectName.next(nextProjectName);
      console.log("Current Project Name "+ nextProjectName);
  }
  changeProjectType( nextProjectType : string ){
    this.ProjectType.next(nextProjectType);
    console.log("Current Project Type "+ nextProjectType);
  }


}


//marker
interface marker{
  name?:string;
  lat: number;
  lng: number;
  draggable:boolean;
  icon:string;
  people:[{name:string}];
  posts:[{
    displayName:string,
    email:string,
    message:string,rve
    timestamp:number
  }];
  type:string;
}

//people
interface people{
  name:string;
  age:number;
  hobbies:[{name:string}];
  summary:string;
  description:string;
}
interface mess{
  displayName:string;
  email:string;
  message:string;
  timestamp:number;
}
