import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor() {

  }

  resetPassword(event, email: string) {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error));
  }

  ngOnInit() {
  }

}
