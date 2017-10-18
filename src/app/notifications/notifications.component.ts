import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {DirectionsMapDirective} from "../maps/googlemaps.directions";

import { AgmCoreModule , AgmMap, AgmMarker ,AgmInfoWindow, AgmKmlLayer, AgmDataLayer, MapTypeStyle } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import {GMapModule, Message} from 'primeng/primeng';
import{Ng2MapModule} from 'ng2-map';
import {GeocodingService} from "../services/geocoding.service";
import {GeolocationService} from "../services/geolocation.service";
import {MapsService} from "../services/maps.service";
import {ProjectService} from "../services/localProject.service";
import {UserService} from "../services/localUser.service";
import {AppComponent} from "../app.component";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

import {AF} from "../providers/af";


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  message:string;
  warning:boolean;
  examp:string;
  peoples: people[];
  markers: FirebaseListObservable<any>;
  messagething:{};
  markerKeys;
  public isLogin:boolean;



    ////////////////////////message variables///////////////////////////
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public newMessage: string;
  public messages: FirebaseListObservable<any>;
  private options: {center: {lat: number; lng: number}};
///////////////////////////////////////////////////////////////////////



    constructor(public afService:AF, private appCom:AppComponent, private maps: MapsService, private geolocation: GeolocationService, private _userService: UserService, public af:AngularFireDatabase) {

      this.markers = this.afService.projects;
      this.peoples=this._userService.getUsers();
      this.messages = this.afService.messages;
      this.markerKeys=Object.keys(this.afService.projects);
      console.log("marker key is"+this.markerKeys[4]);
      this.isLogin=this.appCom.isLoggedIn;


    }




//////////////////////////dashboard component/////////////////////////////////////
    ngAfterViewChecked() {
      this.scrollToBottom();
    }

    scrollToBottom(): void {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  } catch(err) { }
  }

    sendMessage(){
      this.afService.sendMessage(this.newMessage);
      this.newMessage = '';

    }

    isYou(email) {
      if(email == this.afService.email)
        return true;
      else
        return false;
    }

    isMe(email) {
      if(email == this.afService.email)
        return false;
      else
        return true;
    }
    /////////////////////////////////////////////





    /**
     *
     */


    profiles: people[]=[];
    test(m){
      var people=m;
      console.log(m.id);
      this.afService.getProjectMessages(m.id);
      this.messages=this.afService.messages;
      //this.profiles=this.peoples;
      this.messagething=m;
      this.profiles=[];
      for (let i of m.members){
        this.af.object('registeredUsers/'+i.id).subscribe((user)=>{
          this.profiles.push(user);
        })

      }


    }


    ngOnInit() {
      this.options = {
        center: {lat: 55.8808026, lng: -4.2745011},



      }
      this.messagething={name:"general", id:3};






    }


  }
//marker
interface marker{
  name?:string;
  lat: number;
  lng: number;
  draggable:boolean;
  people:[{name:string}];
  posts:[{
    displayName:string,
    email:string,
    message:string,
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



