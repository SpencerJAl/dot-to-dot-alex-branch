import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AF} from '../providers/af';
import {FileUpload} from '../objects/file';
import {UploadFileService} from '../services/uploadFile.servive';
import {FirebaseDataProvider} from '../providers/firebaseDataProvider';
import {FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireDatabase} from 'angularfire2/database/database';
@Component({
  selector: 'app-accountSetup',
  templateUrl: './accountSetup.component.html',
  styleUrls: ['./accountSetup.component.scss']
})
export class AccountSetupComponent {
  error: any;
  interests= {};

  user: FirebaseObjectObservable<any>;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: {percentage: number} = {percentage: 0};
  private _options = [
    {name: 'Art', value: 'Art & Design', checked: false},
    {name: 'Science', value: 'Science', checked: false},
    {name: 'Health', value: 'Health', checked: false},
    {name: 'Craft', value: 'Craft & Workshop', checked: false},
    {name: 'Education', value: 'Education', checked: false},
  ];
  constructor(private afService: AF, private router: Router, private uploadService: UploadFileService, private firebaseData: FirebaseDataProvider, db: AngularFireDatabase) {
    this.user = db.object('registeredUsers/' + afService.userID);
  }
  // get selected file from the dom
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload(id, name) {
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, '/profile', id, name);
  }
  get selectedOptions() { // right now: ['1','3']
    return this._options
      .filter(opt => opt.checked)
      .map(opt => opt.value);
  }

  register($event, description, summary) {
    event.preventDefault();
    console.log('description is' + description);
    console.log('summary is ' + summary);
    console.log('call works');
    this.afService.createProfile(description, summary, this.selectedOptions).then(() => {
      this.router.navigate(['/']);
    })
      .catch((error) => {
        this.error = error;
      });
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

  get options(): ({name: string; value: string; checked: boolean}|{name: string; value: string; checked: boolean}|
    {name: string; value: string; checked: boolean}|{name: string; value: string; checked: boolean}|{name: string; value: string; checked: boolean})[] {
    return this._options;
  }

  set options(value: ({name: string; value: string; checked: boolean}|
    {name: string; value: string; checked: boolean}|{name: string; value: string; checked: boolean}|
    {name: string; value: string; checked: boolean}|{name: string; value: string; checked: boolean})[]) {
    this._options = value;
  }

}
