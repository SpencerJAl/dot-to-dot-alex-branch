import {Injectable} from "@angular/core";
import {GetProjects} from "../localStorage/projects";
/**
 * Created by James on 22/05/2017.
 */
@Injectable()
export class ProjectService extends GetProjects{
  constructor(){
    super();
    console.log('MarkerService Initialized...');
    this.load();
    console.log('MarkerService completed...');
  }

  getMarkers(){
    var markers = JSON.parse(localStorage.getItem('markers'));
    console.log('markers returned')
    return markers;
  }
  sendMessage(message){
    var markers=JSON.parse(localStorage.getItem('markers'));
    markers.push(message);
      localStorage.setItem("markers", JSON.stringify(markers));
  }

  addMarker(newMarker){
    // Fetch markers
    var markers = JSON.parse(localStorage.getItem('markers'));
    // Push to array
    markers.push(newMarker);
    // Set ls markers again
    localStorage.setItem('markers', JSON.stringify(markers));
  }

  updateMarker(marker, newLat, newLng){
    // Fetch markers
    var markers = JSON.parse(localStorage.getItem('markers'));

    for(var i = 0;i < markers.length;i++){
      if(marker.lat == markers[i].lat && marker.lng == markers[i].lng){
        markers[i].lat = newLat;
        markers[i].lng = newLng;
      }
    }

    // Set ls markers again
    localStorage.setItem('markers', JSON.stringify(markers));
  }

  removeMarker(marker){
    // Fetch markers
    var markers = JSON.parse(localStorage.getItem('markers'));

    for(var i = 0;i < markers.length;i++){
      if(marker.lat == markers[i].lat && marker.lng == markers[i].lng){
        markers.splice(i, 1);
      }
    }

    // Set ls markers again
    localStorage.setItem('markers', JSON.stringify(markers));
  }
}
