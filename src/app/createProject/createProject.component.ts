/**
 * Created by James on 18/05/2017.
 */
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AF} from '../providers/af';
import {GeocodingService} from '../services/geocoding.service';
import {FileUpload} from '../objects/file';
import {UploadFileService} from '../services/uploadFile.servive';
import {FormControl, FormGroup} from '@angular/forms';
import {FileTypeValidatorDirective} from '../directives/file-type-validator.directive';
@Component({
  selector: 'app-create-project',
  templateUrl: './createProject.component.html',
  styleUrls: ['./createProject.component.scss']
})
export class CreateProjectComponent implements OnInit {
  get selectedType(): any {
    return this._selectedType;
  }

  set selectedType(value: any) {
    this._selectedType = value;
  }

  error: any;
  center: google.maps.LatLng;

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: {percentage: number} = {percentage: 0};

  items= [];
  form;
  options = [
    {name: 'Art', value: 'artAndDesign', checked: true},
    {name: 'Science', value: 'science', checked: false},
    {name: 'Health', value: 'health', checked: true},
    {name: 'Craft and workshop', value: 'craftAndWorkshop', checked: true},
    {name: 'Education', value: 'education', checked: true},
  ];
  _selectedType: any;
  constructor(private afService: AF, private GC: GeocodingService, private router: Router, private uploadService: UploadFileService) {
    this.form = new FormGroup({
      file: new FormControl('',    [FileTypeValidatorDirective.validate])
    });
  }

  get selectedOptions() { // right now: ['1','3']
    return this.options
      .filter (opt => opt.checked)
      .map (opt => opt.value);
  }


  protected interestHandler(event: any) {
    this._selectedType = event.target.value;
  }
  createProject(event, projectName, desc, sum, loc, money, hours, date) {
    console.log('date is' + date);
    console.log('interest is ' + this._selectedType);
    event.preventDefault();
    //noinspection TypeScriptUnresolvedFunction
    this.GC.codeAddress(loc).forEach((results: google.maps.GeocoderResult[]) => {
      this.center = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
      console.log('lat is : ' + this.center.lat());
      console.log('long is : ' + this.center.lng());
    }).then(() => {
      this.afService.sendProjectRequest(projectName, desc, sum, this._selectedType, this.center.lat(), this.center.lng(), this.items, money, hours, date).then((project) => {
        this.afService.saveProjectID(project.key);
        this.afService.saveProjectToUser(project.key).then(() => {
          this.upload(project.key, 'profilepic');
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
          console.log('no results');
        }
      });
  }

  ngOnInit() {
  }

  addItem(event, itemName, itemDescription, itemAmount) {
    this.items.push({
      name: itemName,
      description: itemDescription,
      amountRequired : itemAmount,
      currentAmount: 0
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload(id, name) {
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, '/projects', id, name);
  }
}
