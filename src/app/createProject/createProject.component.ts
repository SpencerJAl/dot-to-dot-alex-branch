/**
 * Created by James on 18/05/2017.
 */
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AF} from "../providers/af";
import {GeocodingService} from "../services/geocoding.service";

@Component({
  selector: 'app-createProject',
  templateUrl: './createProject.component.html',
  styleUrls: ['./createProject.component.css']
})
export class CreateProjectComponent implements OnInit {

  error:any;
  center: google.maps.LatLng;
  constructor(private afService: AF,private GC:GeocodingService, private router: Router) { }

  createProject(event, projectName, desc, sum, loc) {
    event.preventDefault();
    this.GC.codeAddress(loc).forEach((results: google.maps.GeocoderResult[])=>{
      this.center = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
      console.log("lat is : "+ this.center.lat());
      console.log("long is : "+ this.center.lng());
    }).then(()=>
    {
      this.afService.sendProjectRequest(projectName, desc, sum, this.center.lat(), this.center.lng()).then((project) => {
        console.log("project id is" + project.key);
        this.afService.saveProjectID(project.key);
        this.afService.saveProjectToUser(project.key).then(()=> {

          this.router.navigate(['']);
        })
          .catch((error) => {
            this.error = error;
          });
      })
        .catch((error) => {
          this.error = error;
          console.log(this.error);
        });
    }).catch(
      (status: google.maps.GeocoderStatus) => {
        if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
          console.log("no results");
        }
      })
  }

  ngOnInit() {
  }

}
