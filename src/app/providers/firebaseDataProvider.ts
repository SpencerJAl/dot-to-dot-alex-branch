import {Injectable} from '@angular/core';

@Injectable()
export class FirebaseDataProvider {
  live = {
    profilePicture: 'https://firebasestorage.googleapis.com/v0/b/project--1058925460034076790.appspot.com/o/profile%2F',
    projectPicture: 'https://firebasestorage.googleapis.com/v0/b/project--1058925460034076790.appspot.com/o/projects%2F',
    supplerPicture: 'https://firebasestorage.googleapis.com/v0/b/project--1058925460034076790.appspot.com/o/suppliers%2F'
  };
  dev = {
    profilePicture: 'https://firebasestorage.googleapis.com/v0/b/project--5383574466381407389.appspot.com/o/profile%2F',
    projectPicture: 'https://firebasestorage.googleapis.com/v0/b/project--5383574466381407389.appspot.com/o/projects%2F',
    supplierPicture: 'https://firebasestorage.googleapis.com/v0/b/project--5383574466381407389.appspot.com/o/suppliers%2F',
  };
  data;
  constructor() {
   this.data = this.dev;
  }
}
