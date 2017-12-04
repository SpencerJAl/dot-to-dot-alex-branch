import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class MarkersService {
 private ProjectID = new BehaviorSubject<string>("3");
 currentProjectID = this.ProjectID.asObservable();

  constructor() { }
  changeProjectID( nextProjectID : string ){
  this.ProjectID.next(nextProjectID);
  console.log("Current Project ID "+ nextProjectID);
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
