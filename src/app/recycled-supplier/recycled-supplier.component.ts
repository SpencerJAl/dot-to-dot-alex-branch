import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AF} from '../providers/af';
import {GeocodingService} from '../services/geocoding.service';
import {FileUpload} from '../objects/file';
import {UploadFileService} from 'app/services/uploadFile.servive';

@Component({
  selector: 'app-recycled-supplier',
  templateUrl: './recycled-supplier.component.html',
  styleUrls: ['./recycled-supplier.component.scss']
})
export class RecycledSupplierComponent implements OnInit {

  // variables for the image upload
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: {percentage: number} = {percentage: 0};
  // other variables
  error: any;
  center: google.maps.LatLng;
  constructor(private afService: AF, private GC: GeocodingService, private router: Router, private uploadService: UploadFileService) { }

  createSupplier(event, supplierName, address, address2, desc, sum, loc) {
    event.preventDefault();
    // noinspection TypeScriptUnresolvedFunction
    this.GC.codeAddress(loc).forEach((results: google.maps.GeocoderResult[]) => {
      this.center = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
      console.log('lat is : ' + this.center.lat());
      console.log('long is : ' + this.center.lng());
    }).then(() => {
      this.afService.sendSupplierRequest(supplierName, address, address2, desc, sum, this.center.lat(), this.center.lng()).then((supplier) => {
        console.log('supplier id is' + supplier.key);
        console.log('address is' + address + ' ' + address2);
        this.afService.saveSupplierID(supplier.key);
        this.upload(supplier.key, 'profilepic');
        this.afService.saveSupplierToUser(supplier.key).then(() => {
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

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload(id, name) {
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, '/suppliers', id, name);
  }
  ngOnInit() {
  }

}
