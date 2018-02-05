import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';

import {DirectionsMapDirective} from '../maps/googlemaps.directions';

import { AgmCoreModule , AgmMap, AgmMarker , AgmInfoWindow, AgmKmlLayer, AgmDataLayer, MapTypeStyle } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import {GMapModule, Message} from 'primeng/primeng';
import {Ng2MapModule} from 'ng2-map';
import {GeocodingService} from '../services/geocoding.service';
import {GeolocationService} from '../services/geolocation.service';
import {MapsService} from '../services/maps.service';
import {ProjectService} from '../services/localProject.service';
import {UserService} from '../services/localUser.service';
import {AppComponent} from '../app.component';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

import {AF} from '../providers/af';
import {MarkersService} from '../maps/markers.service';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {FirebaseObjectFactoryOpts} from 'angularfire2/interfaces';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,


})
export class NotificationsComponent implements OnInit {
  message: string;
  warning: boolean;
  examp: string;
  peoples: people[];
  markers: FirebaseListObservable<any>;
  messagething: {};
  markerKeys;
  public isLogin: boolean;
  projectID: string;
  projectName: string;
  projectType: string;
  currentUser: FirebaseObjectObservable<any>;
  projects: FirebaseListObservable<any>;
  ////////////////////////message variables///////////////////////////
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public newMessage: string;
  public messages: FirebaseListObservable<any>;
  private options: {center: {lat: number; lng: number}};
  private joinedprojects: FirebaseListObservable<any>;
  ///////////////////////////////////////////////////////////////////////
  notifications: Array<any> = [{}];
  constructor(public afService: AF, private cd: ChangeDetectorRef, private markerService: MarkersService, private appCom: AppComponent, private maps: MapsService,
              private geolocation: GeolocationService, private _userService: UserService, public af: AngularFireDatabase) {

      this.markers = this.afService.projects;
      this.peoples = this._userService.getUsers();
      this.messages = this.afService.messages;
      this.markerKeys = Object.keys(this.afService.projects);
      console.log('marker key is' + this.markerKeys[4]);
      this.isLogin = this.appCom.isLoggedIn;
      this.currentUser = this.afService.getUser(this.afService.userID);
      this.joinedprojects = this.afService.getJoinedProjects();
      this.projects = this.afService.getAllProjects();
     console.log(this.currentUser);
     this.joinedprojects.subscribe((joined) => {
       this.projects.subscribe((projects) => {
         for (const j of joined) {
           for (const p of projects) {
           if (p.id === j.id) {this.addNotifications(j.id); }
         }
         }
       });

     });
  }


    addNotifications(id) {
    this.af.list('projects/' + id + '/notifications').subscribe((n) => {
      for (let note of n){
        console.log('message is: ' + note.message);
        this.notifications.push(note);
      }
    });
    }


//////////////////////////dashboard component/////////////////////////////////////
  ngAfterViewChecked() {
      this.scrollToBottom();
  }

    scrollToBottom(): void {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  } catch (err) { }
  }

    sendMessage() {
      console.log('new message = ' + this.newMessage);

      /*if(this.currentUser.avatar!=udefined) {
        this.afService.sendMessage(this.newMessage, this.currentUser.avatar);
      }
      else
        {*/
      console.log(this.currentUser);
        this.afService.sendMessage(this.newMessage, '../../images/avatar.png');
      // }
      console.log('Message Sent');
      this.newMessage = '';

    }

    isYou(email) {
      if (email == this.afService.email)
        return true;
      else
        return false;
    }

    isMe(email) {
      if (email == this.afService.email)
        return false;
      else
        return true;
    }
    /////////////////////////////////////////////





    /**
     *
     */


    profiles: people[] = [];
    test(m) {
      var people = m;
      console.log(m.id);
      this.afService.getProjectMessages(m.id);
      this.messages = this.afService.messages;
      // this.profiles=this.peoples;
      this.messagething = m;
      this.profiles = [];
      for (let i of m.members){
        this.af.object('registeredUsers/' + i.id).subscribe((user) => {
          this.profiles.push(user);
        });

      }


    }


    ngOnInit() {
      this.options = {
        center: {lat: 55.8808026, lng: -4.2745011},
      };

      this.markerService.currentProjectName.subscribe(projectName => this.projectName = projectName );
      this.markerService.currentProjectType.subscribe(projectType => this.projectType = projectType );
      this.markerService.currentProjectID.subscribe(projectID => {
        this.projectID = projectID;

        this.messagething = {name: this.projectName, id: this.projectID};

        this.messages = this.afService.getProjectMessages(this.projectID);
        this.cd.markForCheck();
        console.log('subscriber for notifications fired ' + this.projectName );
      });
      // this.markerService.currentProjectName.subscribe(projectName => this.projectName= projectName );
      // this.markerService.currentProjectType.subscribe(projectType => this.projectType= projectType );
      // this.messagething={name:this.projectName, id:this.projectID};
      // this.afService.getProjectMessages(this.projectID);

      this.afService.getProjectMessages(this.projectID);
      this.cd.detectChanges();
      console.log('OnInit for notifications fired');
    }


  }
// marker
interface marker {
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
  people: [{name: string}];
  posts: [{
    displayName: string,
    email: string,
    message: string,
    timestamp: number
  }];
  type: string;
}

// people
interface people {
  name: string;
  age: number;
  hobbies: [{name: string}];
  summary: string;
  description: string;
}
interface mess {
  displayName: string;
  email: string;
  message: string;
  timestamp: number;
}



