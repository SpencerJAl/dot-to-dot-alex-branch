/**
 * Created by James on 17/05/2017.
 */

import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';


@Injectable()
export class AF {

  public user: FirebaseObjectObservable<any>;
  public messages: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  public userID: string;
  public projects: FirebaseListObservable<any>;
  public ownedProjects: FirebaseListObservable<any>;
  public loggedIn:boolean=false;
  public project: FirebaseObjectObservable<any>;
  public projectRequests: FirebaseListObservable<any>;
 // uid: string;

  /**
   * constructure to initiate functionaly for this service
   * @param af
     */
  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.database.object('registeredUsers/' + auth.uid);
          this.userID=auth.uid ;
          this.ownedProjects=this.af.database.list('registeredUsers/'+auth.uid+'/ownedProjects');
          this.loggedIn=true;
        }
        else{this.loggedIn=false;}
      });
    this.projectRequests=this.af.database.list('projectRequests');
    this.messages = this.af.database.list('messages');
    this.users = this.af.database.list('users');
    this.projects = this.af.database.list('projects');
  }

  ////////////////////////register functionality//////////////////
  /**
   *registers a user in the firebase users
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password) {
    console.log(email);
    return this.af.auth.createUser({
      email: email,
      password: password
    });
  }

  /**
   * saves a user profile
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  saveUserInfoFromForm(uid, name, email) {
    return this.af.database.object('registeredUsers/' + this.userID).set({
      name: name,
      email: email,
      type:"user",
      id:uid
    });
  }
  saveAdminInfoFromForm(uid, name, email) {
    return this.af.database.object('registeredUsers/' + this.userID).set({
      name: name,
      email: email,
      type: "admin",
      id:uid
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
    return this.af.auth.login({
        email: email,
        password: password,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }



    /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

  loginWithFacebook() {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    });
  }

  loginWithTwitter() {
    return this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup,
    });
  }


  /**
   * Logs out the current user
   */
  logout() {
    return this.af.auth.logout();
  }
  /////////////////////////////////////////////////////////////////////////

  ///////////////////////userProfile///////////////////////////////////////
  /**
   * This section is specifically here to handel logged in a logged in users account data.
   */
  createProfile(userDescription, userSummary,  userInterests){
    return this.af.database.object('registeredUsers/' + this.userID).update({
      description:userDescription,
      summary:userSummary,
      interests:userInterests,
    });
  }

  myProfile(){
    return this.user;
  }
  editProfile(userDescription, userSummary, userInterests){
    return this.af.database.object('registeredUsers/' + this.userID).update({
      description:userDescription,
      summary:userSummary,
      interests:userInterests,
    });
  }
  /////////////////////////////////////////////////////////////////////////

  ////////////////////////admin stuff///////////////////////////
  getProjectRequests(id){
    console.log("id is" +id);
    this.project=this.af.database.object('projectsRequests/'+id);
    return this.project;
  }
  projectApprove(project, delID){


    var proj = {
      name: project.name,
      description:project.description,
      summary: project.summary,
      owner: project.owner,
      lat:project.lat,
      lng:project.lng
    }
    var key;
    console.log("project name is "+ project.name);

    return this.af.database.list('projects').push(proj).then((p)=>{
      key=p.key;

      console.log("project deleted" +p.key);

      this.af.database.object('projects/'+p.uid).update({
        id:key,
      }).then(()=>{this.projectDecline(delID);});
    });

    /*return this.af.database.list('projects/').push(project).then((p)=>{
      console.log("attempting to push the id to the project");
      this.af.database.object('projects/'+p.uid).update({
        id :p.uid
      }
      ).then(()=>{this.projectDecline(p.uid);});
    }); */
  }

  projectDecline(id){
    console.log("project declined is" + id);
    return this.af.database.list('projectRequests/').remove(id).then(()=>{
      console.log("project deleted"+ id);
    });
  }
  deleteUser(){}
  archiveUsers(){}
  getUsers(){
    return this.users;
  }
  /////////////////////////////project////////////////////////////////////
  /**
   * this section of code is to handel projects
   */

  sendProjectRequest(projectName, projectDisc, projectSum, lat, lng){
    var project = {
      name: projectName,
      description:projectDisc,
      summary:projectSum,
      owner: this.userID,
      lat:lat,
      lng:lng
    }
    return this.projectRequests.push(project);
  }

  saveProjectID(uid){
    return this.af.database.object('projectRequests/' + uid).update( {id: uid} );
  }
  saveProjectInfoFromForm(projectName, projectDisc, projectSum, lat, lng){
    alert("thing passed is: " + projectName);
    var project = {
      name: projectName,
      description:projectDisc,
      summary:projectSum,
      owner: this.userID,
      lat:lat,
      lng:lng
    }
    return this.projects.push(project);
    /*return this.af.database.object('projects/'+projectName).set({
     name: projectName,
     owner: this.email,
     });*/
  }

  saveProjectToUser(projectID){
    var thing={
      name:projectID
    }
    return this.ownedProjects.push(thing);
  }

  getProjectMessages(id){
    this.messages=this.af.database.list('projects/'+id+'/messages');
    return this.af.database.list('projects/'+id+'/messages');
  }

  getAllProjects(){
    return this.projects;
  }
  getProject(id){
    console.log("id is" +id);
    this.project=this.af.database.object('projects/'+id);
    return this.project;
  }
  getUser(id){
    return this.af.database.list('registeredUsers/'+id);
  }
  join(id){
    console.log("users id is " + this.userID)
    this.af.database.list('registeredUsers/'+this.userID+'/joinedProjects').push({
      id:id,
    });

    return this.af.database.list('projects/'+id+'/members').push(
      {
        id:this.userID,
      }
    );
  }
  ////////////////////////////////////////////////////////////////////////


  /**
   *creates a user profile in the database
   */
  addUserInfo(){
    //We saved their auth info now save the rest to the db.
    this.users.push({
      email: this.email,
      displayName: this.displayName
    });
  }

  /**
   * Saves a message to the Firebase Realtime Database
   * @param text
   */
  sendMessage(text) {
    var message = {
      message: text,
      displayName: this.displayName,
      email: this.email,
      timestamp: Date.now()
    };
    this.messages.push(message);

  }

  private _getUserInfo(user: any): any {
    if(!user) {
      return {};
    }
    let data = user.auth.providerData[0];
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

  isAuth(){
    return this.loggedIn;
  }

}
