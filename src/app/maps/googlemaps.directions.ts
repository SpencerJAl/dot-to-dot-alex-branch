/**
 * Created by davem on 30/07/2017.
 */
import {GoogleMapsAPIWrapper} from '@agm/core/services/google-maps-api-wrapper';
import { Directive,  Input} from '@angular/core';
import {} from ''
declare var google: any;

@Directive({
  selector: '<agm-map-directions  [origin]="origin" [destination]="destination" #test></agm-map-directions>'
})
export class DirectionsMapDirective {
  @Input() origin;
  @Input() destination;
  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}
  ngOnInit() {
    //noinspection TypeScriptUnresolvedFunction
    this.gmapsApi.getNativeMap().then(map => {

      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;

      console.log('test');
      directionsDisplay.setMap(map);
      directionsService.route({
        origin: {lat: this.origin.latitude, lng: this.origin.longitude},
        destination: {lat: this.destination.latitude, lng: this.destination.longitude},
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {


          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

    });
  }
}
