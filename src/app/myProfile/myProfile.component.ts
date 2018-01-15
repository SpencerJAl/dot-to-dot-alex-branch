import {OnInit, Component} from '@angular/core';
import {FirebaseObjectObservable} from 'angularfire2/database';
import {AF} from '../providers/af';
import {Router} from '@angular/router';
import {AngularFireDatabase} from "angularfire2/database/database";
import {UploadFileService} from "../services/uploadFile.servive";
import {FileUpload} from '../objects/file';
/**
 * Created by James on 22/05/2017.
 */
@Component({
  selector: 'app-my-profile-root',
  templateUrl: 'myProfile.component.html',
  styleUrls: ['myProfile.component.scss']
})



export class MyProfileComponent implements OnInit {
  options = [
    {name: 'Art', value: 'artAndDesign', checked: true},
    {name: 'Science', value: 'science', checked: false},
    {name: 'Health', value: 'health', checked: true},
    {name: 'Craft and workshop', value: 'craftAndWorkshop', checked: true},
    {name: 'Education', value: 'education', checked: true},
  ];

  get selectedOptions() { // right now: ['1','3']
    return this.options
      .filter (opt => opt.checked)
      .map (opt => opt.value);
  }

  user: FirebaseObjectObservable<any>;

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: {percentage: number} = {percentage: 0};


  //get selected file from the dom
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  constructor(private afService: AF, private router: Router, db: AngularFireDatabase, private uploadService: UploadFileService ) {
    this.user=db.object('registeredUsers/'+ afService.userID);
  }

  upload(id, name) {
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, '/projects', id, name);
  }

  editprofile(name, description, summary, facebook, twitter){

    var edit = {
      name: name,
      description: description,
      summary: summary,
      facebook: facebook,
      twitter: twitter,
    }

  }

  ngOnInit() {}
}
