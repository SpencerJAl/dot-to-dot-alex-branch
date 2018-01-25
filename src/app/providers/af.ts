/**
 * Created by James on 17/05/2017.
 */

import {Injectable} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {FirebaseDataProvider} from './firebaseDataProvider';

@Injectable()
export class AF {

  public user: FirebaseObjectObservable<any>;
  public messages: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  public userID: string;
  public projects: FirebaseListObservable<any>;
  public joinedProjects: FirebaseListObservable<any>;
  public ownedSuppliers: FirebaseListObservable<any>;
  public ownedProjects: FirebaseListObservable<any>;
  public loggedIn: boolean = false;
  public project: FirebaseObjectObservable<any>;
  public projectRequests: FirebaseListObservable<any>;
  public suppliers: FirebaseListObservable<any>;
  public supplier: FirebaseObjectObservable<any>;
  public supplierRequests: FirebaseListObservable<any>;
 // uid: string;

  /**
   * constructor to initiate functionally for this service
   * @param af
     */
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, public firebaseData: FirebaseDataProvider) {
    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.object('registeredUsers/' + auth.uid);
          this.userID = auth.uid ;

            this.email = auth.email;


          this.ownedProjects = this.af.list('registeredUsers/' + auth.uid + '/ownedProjects');
          this.joinedProjects = this.af.list('registeredUsers/' + auth.uid + '/joinedProjects');

          this.loggedIn = true;
        } else {
          this.loggedIn = false;
          this.projects = this.af.list('projects');
        }
      });
    this.supplierRequests = this.af.list('supplierRequests');
    this.projectRequests = this.af.list('projectRequests');
    this.messages = this.af.list('messages');
    this.users = this.af.list('users');
    this.projects = this.af.list('projects');
  }

  ////////////////////////register functionality//////////////////
  /**
   *registers a user in the firebase users
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password) {
    console.log(email);
    return this.afAuth.auth.createUserWithEmailAndPassword( email, password);
  }

  /**
   * saves a user profile
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  saveUserInfoFromForm(uid, name, email) {
    return this.af.object('registeredUsers/' + this.userID).set({
      name: name,
      email: email,
      type: 'user',
      id: uid
    });
  }
  saveAdminInfoFromForm(uid, name, email) {
    return this.af.object('registeredUsers/' + this.userID).set({
      name: name,
      email: email,
      type: 'admin',
      id: uid
    });
  }

  ////////////////////////////////////////////////////////////////

  ///////////////////////login Functionality//////////////////////
  /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithEmail(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password);
  }
    /*
    login({
        email: email,
        password: password,
      },
      {
        provider: this.afAuth.providers.password,
        method: this.afAuth.email,
      });
  }
  */



    /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    return this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => console.log(res));
    }
     /*
      this.afAuth.login({this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      provider: FirebaseAuth.google,
      method: FirebaseAuth.popup,

    });*/


  loginWithFacebook() {
    return  this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => console.log(res));
  }

  loginWithTwitter() {
    return   this.afAuth.auth
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(res => console.log(res));
  }


  /**
   * Logs out the current user
   */
  logout() {
    return this.afAuth.auth.signOut();
  }
  /////////////////////////////////////////////////////////////////////////

  ///////////////////////userProfile///////////////////////////////////////
  /**
   * This section is specifically here to handel logged in a logged in users account data.
   */
  createProfile(userDescription, userSummary,  userInterests) {
    return this.af.object('registeredUsers/' + this.userID).update({
      description: userDescription,
      summary: userSummary,
      interests: userInterests,
      type: 'user',
      avatar: '../../images/avatar.png'
    });
  }

  myProfile() {
    return this.user;
  }
  editProfile(userDescription, userSummary, userInterests) {
    return this.af.object('registeredUsers/' + this.userID).update({
      description: userDescription,
      summary: userSummary,
      interests: userInterests,
    });
  }
  /////////////////////////////////////////////////////////////////////////

  ////////////////////////admin stuff///////////////////////////

  getAllProjectRequests() {

    this.projectRequests = this.af.list('projectRequests/');
    return this.projectRequests;
  }
  getProjectRequests(id) {
    console.log('id is' + id);
    this.project = this.af.object('projectsRequests/' + id);
    return this.project;
  }
  projectApprove(project, delID) {
    const proj = {
      name: project.name,
      description: project.description,
      summary: project.summary,
      owner: project.owner,
      lat: project.lat,
      lng: project.lng
    };
    let key;
    console.log('project name is ' + project.name);

    return this.af.list('projects').push(project).then((p) => {
      key = p.key;

      console.log('project deleted' + p.key);
      console.log('Project key :' + p.key + ' project id:' + p.uid);
      this.af.object('projects/' + p.key).update({
        id: key,
      }).then(() => {this.projectDecline(delID).then((d) => {
        this.af.object('/registeredUsers/' + this.userID + '/ownedProjects/' + delID).update({name: key});
      }); });
    });

    /*return this.af.list('projects/').pusrdish(project).then((p)=>{
      console.log("attempting to push the id to the project");
      this.af.object('projects/'+p.uid).update({
        id :p.uid
      }
      ).then(()=>{this.projectDecline(p.uid);});
    }); */
  }
  supplierApprove(project, delID) {



    let key;
    console.log('project name is ' + project.name);

    return this.af.list('suppliers').push(project).then((p) => {
      key = p.key;

      console.log('project deleted' + p.key);

      this.af.object('suppliers/' + p.uid).update({
        id: key,
      }).then(() => {this.supplierDecline(delID); });
    });

    /*return this.af.list('projects/').pusrdish(project).then((p)=>{
      console.log("attempting to push the id to the project");
      this.af.object('projects/'+p.uid).update({
        id :p.uid
      }
      ).then(()=>{this.projectDecline(p.uid);});
    }); */
  }
  projectDecline(id) {
    console.log('project declined is' + id);
    return this.af.list('projectRequests/').remove(id).then(() => {
      console.log('project deleted' + id);
    });
  }

  supplierDecline(id) {
    console.log('project declined is' + id);
    return this.af.list('supplierRequests/').remove(id).then(() => {
      console.log('project deleted' + id);
    });
  }
  deleteUser() {}
  archiveUsers() {}
  getUsers() {
    return this.users;
  }
  /////////////////////////////project////////////////////////////////////
  /**
   * this section of code is to handel projects
   */
  // creates a request to the admins to approve or decline a new project
  sendProjectRequest(projectName, projectDisc, projectSum, projectType, lat, lng) {


    // statements;
    const icontype = '../../images/' + projectType + '.png';



    const project = {
      name: projectName,
      description: projectDisc,
      summary: projectSum,
      owner: this.userID,
      type: projectType,
      lat: lat,
      lng: lng,
      icon: icontype
    };
    return this.projectRequests.push(project);
  }

  postProjectNotification(text, avatar, id, title) {
    const notification = {
      title: title,
      message: text,
      // displayName: this.displayName,
      // email: this.email,
      avatar: avatar,
      timestamp: Date.now()
    };

    console.log('this email' + this.email);
    this.af.list('projects/' + id + '/notifications').push(notification);

  }

  getJoinedProjects() {
    console.log('registeredUsers/' + this.userID + '/joinedProjects');
    return this.af.list('registeredUsers/' + this.userID + '/joinedProjects');

  }
  getOwnedProjects() {
    console.log('registeredUsers/' + this.userID + '/ownedProjects');


    return this.af.list('registeredUsers/' + this.userID + '/ownedProjects');
    /*this.af.list('projects/',{
    query: {
      orderByChild: 'id',
      equalTo:   this.af.list('registeredUsers/' + this.userID +'/ownedProjects'),
    });
    */
  }

  saveProjectID(uid) {
    // change this to live for when needed.
    // live
    // const pic = 'https://firebasestorage.googleapis.com/v0/b/project--1058925460034076790.appspot.com/o/projects%2F' + uid + '%2Fprofilepic?alt=media';
    // dev
    const pic = this.firebaseData.data.projectPicture + uid + '%2Fprofilepic?alt=media';
    return this.af.object('projectRequests/' + uid).update( {
      id: uid,
      image: pic
    } );
  }
  saveProjectInfoFromForm(projectName, projectDisc, projectSum, lat, lng) {
    alert('thing passed is: ' + projectName);
    const project = {
      name: projectName,
      description: projectDisc,
      summary: projectSum,

      owner: this.userID,
      lat: lat,
      lng: lng
    };
    return this.projects.push(project);
    /*return this.af.object('projects/'+projectName).set({
     name: projectName,
     owner: this.email,
     });*/
  }

  saveProjectToUser(projectID) {
    const thing = {
      name: projectID
    };
    return this.af.object('registeredUsers/' + this.userID + '/ownedProjects/' + projectID).update(thing);
  }

  getProjectMessages(id) {
    this.messages = this.af.list('projects/' + id + '/messages');
    console.log('get project messages  fired');
    return this.af.list('projects/' + id + '/messages');
  }

  getAllProjects() {
    return this.projects;
  }
  getProject(id) {
    console.log('id is' + id);
    this.project = this.af.object('projects/' + id);
    return this.project;
  }
  getUser(id) {
    return this.af.list('registeredUsers/' + id);
  }
  join(id) {
    console.log('users id is ' + this.userID);
    this.af.list('registeredUsers/' + this.userID + '/joinedProjects').push({
      id: id,
    });

    return this.af.list('projects/' + id + '/members').push(
      {
        id: this.userID,
      }
    );
  }
  ////////////////////////////////////////////////////////////////////////
/////////////// Waste Suppliers//////////////////////////////////////////


  sendSupplierRequest(supplierName, address, address2, supplierDisc, supplierSum, lat, lng) {
    const supplier = {
      name: supplierName,
      address: address,
      address2: address2,
      description: supplierDisc,
      summary: supplierSum,
      owner: this.userID,
      lat: lat,
      lng: lng
    };
    return this.supplierRequests.push(supplier);
  }

  saveSupplierID(uid) {
    const picture = this.firebaseData.data.supplierPicture + uid + '%2Fprofilepic?alt=media';
    return this.af.object('supplierRequests/' + uid).update( {
      id: uid,
      image: picture
    } );
  }
  saveSupplierInfoFromForm(supplierName, supplierAddress, supplierAddress2, supplierDisc, supplierSum, lat, lng) {
    alert('thing passed is: ' + supplierName);
    const supplier = {
      name: supplierName,
      address: supplierAddress,
      adreess2: supplierAddress2,
      description: supplierDisc,
      summary: supplierSum,
      owner: this.userID,
      lat: lat,
      lng: lng
    };
    return this.suppliers.push(supplier);
    /*return this.af.object('suppliers/'+supplierName).set({
     name: supplierName,
     owner: this.email,
     });*/
  }

  saveSupplierToUser(supplierID) {
    const thing = {
      name: supplierID
    };
    return this.ownedSuppliers.push(thing);
  }

  getSupplierMessages(id) {
    this.messages = this.af.list('suppliers/' + id + '/messages');
    return this.af.list('suppliers/' + id + '/messages');
  }

  getAllSuppliers() {
    return this.suppliers;
  }
  getSupplier(id) {
    console.log('id is' + id);
    this.supplier = this.af.object('suppliers/' + id);
    return this.supplier;
  };

  /**
   *creates a user profile in the database
   */
  addUserInfo() {
    // We saved their auth info now save the rest to the db.
    this.users.push({
      email: this.email,
      displayName: this.displayName
    });
  }

  /**
   * Saves a message to the Firebase Realtime Database
   * @param text
   */
  sendMessage(text, avatar) {
    const message = {
      message: text,
      displayName: this.displayName,
      email: this.email,
      avatar: avatar,
      timestamp: Date.now()
    };
    console.log('this email' + this.email);
    this.messages.push(message);

  }

  private _getUserInfo(user: any): any {
    if (!user) {
      return {};
    }
    const data = user.auth.providerData[0];
    return {
      name: data.displayName,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId
    };
  }

  //////////////////////project create//////////////////

  //////////////////////////////////end of project create////////////



  /**
   * checks if the user is authenticated
   */

  isAuth() {
    return this.loggedIn;
  }

}

export interface project {

  name: string;
  description: string;
  summary: string;
  type: string;
  owner: string;
  lat: number;
  lng: number;

}
