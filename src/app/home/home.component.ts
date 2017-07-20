import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';


import { AgmCoreModule , GoogleMapsAPIWrapper,AgmMap} from '@agm/core';
import {GMapModule, Message} from 'primeng/primeng';
import{Ng2MapModule} from 'ng2-map';
import {GeocodingService} from "../services/geocoding.service";
import {GeolocationService} from "../services/geolocation.service";
import {MapsService} from "../services/maps.service";
import {ProjectService} from "../services/localProject.service";
import {UserService} from "../services/localUser.service";
import {FirebaseListObservable, AngularFireDatabase} from "angularfire2/database";
import * as FireBase from 'firebase/app';
import {AF} from "../providers/af";
import {NotificationsComponent}from "../notifications/notifications.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  zoom: number = 18;
  lat: number = 55.8808026;
  lng: number = -4.2745011;
  label: string = 'STEAMpunks HQ';

  options: any;
  draggable: boolean;
  startLat: number   = -55.8808026;

  startLng: number = -4.2745011 ;
  center:any;
  message:string;
  warning:boolean;
  examp:string;
  peoples: people[];
  markers: FirebaseListObservable<any>;
  messagething:{};
  markerKeys;



  ////////////////////////message variables///////////////////////////
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public newMessage: string;
  public messages: FirebaseListObservable<any>;
///////////////////////////////////////////////////////////////////////



  constructor(public afService:AF, private maps: MapsService, private geolocation: GeolocationService, private _userService: UserService, public af: AngularFireDatabase) {
    this.zoom=18;
    this.markers = this.afService.projects;
    this.peoples=this._userService.getUsers();
    this.messages = this.afService.messages;
    this.markerKeys=Object.keys(this.afService.projects);
    console.log("marker key is"+this.markerKeys[4]);



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
      zoom: 16,
      style: mapStyle
    }
    this.messagething={name:"general", id:3};


    if (navigator.geolocation) {
      this.geolocation.getCurrentPosition().forEach(
        (position: Position) => {
          // New center object: triggers OnChanges.
          this.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          this.startLat=position.coords.latitude;
          this.startLng=position.coords.longitude;
          this.zoom = 11;
        }
      ).then(() => console.log('Geolocation service: completed.')).catch(
        (error: PositionError) => {
          if (error.code > 0) {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                this.message = 'permission denied';
                break;
              case error.POSITION_UNAVAILABLE:
                this.message = 'position unavailable';
                break;
              case error.TIMEOUT:
                this.message = 'position timeout';
                break;
            }
            this.warning = true;
          }
        });
    } else {
      this.message = "browser doesn't support geolocation";

      this.warning = true;

    }



  }
}



export const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

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
