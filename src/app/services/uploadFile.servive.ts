
import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {FileUpload} from '../objects/file';
import * as firebase from 'firebase/app';
import 'firebase/storage';
@Injectable()
export class UploadFileService {
  private basePath = '/uploads';
  constructor(private db: AngularFireDatabase) {}
  pushFileToStorage(fileUpload: FileUpload, progress: {percentage: number}, type, id, name) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${type}/${id}/${name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload);
      }
    );
  }

  private saveFileData(fileUpload: FileUpload) {
    this.db.list(`${this.basePath}/`).push(fileUpload);
  }
}
