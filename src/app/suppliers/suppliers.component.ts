import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FacebookService, InitParams} from 'ngx-facebook';
import {ActivatedRoute, Router} from '@angular/router';
import {Message, Project} from '../providers/project';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AF} from '../providers/af';
import {AngularFireModule} from 'angularfire2';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  currentUser: FirebaseObjectObservable<any>;
  error: any;
  supplier: FirebaseObjectObservable<Project>;
  id: string;
  isMember: boolean;

  // this is currently a work around because of problems subscribing for some reason, will be fixed later
  projects: FirebaseListObservable<any>;
  projectData: {};
  messages: FirebaseListObservable<Message[]>;
  posts: any;
  userID: string;
  owner: string;
  projectID: string;
  currentProject: Project;
  facebookMessage: string;
  notifications: FirebaseListObservable<any>;
  itemsWanted: FirebaseListObservable<any>;
  joined: boolean = false;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public newMessage: string;


  constructor(private afService: AF, private router: Router, private afAuth: AngularFireModule, private db: AngularFireDatabase, private route: ActivatedRoute, private fb: FacebookService) {



    db.list('projects/' + this.route.snapshot.params['id'] + 'members').subscribe((m) => {
      for (const mem of m ) {
        if (mem.id === this.afService.userID) { this.joined = true; }
      }
    });
   // this.itemsWanted = db.list('suppliers/' + this.route.snapshot.params['id'] + '/itemsWanted');
    this.supplier = db.object('suppliers/' + this.route.snapshot.params['id']);
    this.messages = db.list('suppliers/' + this.route.snapshot.params['id'] + '/messages');
    this.notifications = db.list('suppliers/' + this.route.snapshot.params['id'] + '/messages');
    this.currentUser = this.afService.getUser(this.afService.userID);
    this.projectID = this.route.snapshot.params['id'];
    this.supplier.subscribe((p) => {
      this.projectData = p;
    });

    this.userID = afService.userID;
    let initParams: InitParams = {
      appId: '1601932213156995',
      xfbml: true,
      version: 'v2.8'

    };



    fb.init(initParams);

  }





  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log('params are' + this.id);
  }
  postUpdate() {}

  sendMessage() {
    console.log('new message = ' + this.newMessage);


    const message = {
      message: this.newMessage,
      displayName: this.afService.displayName,
      email: this.afService.email,
      avatar: '',
      timestamp: Date.now()

    };
    this.afService.serSupplierMessages(this.route.snapshot.params['id']);
    this.messages.push(message);
    /* if(this.currentUser!=udefined) {
       this.afService.sendMessage(this.newMessage, this.currentUser);
     }
     else
       {*/
    // console.log(this.currentUser);

    // this.afService.sendMessage(this.newMessage, '../../images/avatar.png');
    // }
    console.log('Message Sent');
    this.newMessage = '';

  }

  isYou(email) {
    if(email == this.afService.email)
      return true;
    else
      return false;
  }

  isMe(email) {
    if(email == this.afService.email)
      return false;
    else
      return true;
  }

}
