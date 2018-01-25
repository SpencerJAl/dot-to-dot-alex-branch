import {OnInit, Component} from '@angular/core';
import {FirebaseObjectObservable} from 'angularfire2/database';
import {AF} from '../providers/af';
import {Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database/database';
import {UploadFileService} from '../services/uploadFile.servive';
import {FileUpload} from '../objects/file';
import {FirebaseDataProvider} from '../providers/firebaseDataProvider';
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
    {name: 'Art', value: 'artAndDesign', checked: false},
    {name: 'Science', value: 'science', checked: false},
    {name: 'Health', value: 'health', checked: false},
    {name: 'Craft and workshop', value: 'craftAndWorkshop', checked: false},
    {name: 'Education', value: 'education', checked: false},
  ];

  get selectedOptions() { // right now: ['1','3']
    return this.options
      .filter (opt => opt.checked)
      .map (opt => opt.value);
  }

  error: any;
  user: FirebaseObjectObservable<any>;

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: {percentage: number} = {percentage: 0};



  constructor(private afService: AF, private router: Router, db: AngularFireDatabase, private uploadService: UploadFileService, public firebaseData: FirebaseDataProvider) {
    this.user = db.object('registeredUsers/' + afService.userID);
  }
  ngOnInit() { }

  // get selected file from the dom
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload(id, name) {
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, '/profile', id, name);
  }

  editprofile(event, name, description, summary, facebook, twitter) {

    const pic = this.firebaseData.data.profilePicture + this.afService.userID + '%2Fprofilepic?alt=media';
    const edit = {
      avatar: pic,
      name: name,
      description: description,
      summary: summary,
      facebook: facebook,
      twitter: twitter,
      interests: this.selectedOptions,
    };
    this.user.update(edit).then((profile) => {
      if (this.selectedFiles != null) {
        this.upload(this.afService.userID, 'profilepic');
      } else {console.log('image not changed'); }
    });
  }


}
