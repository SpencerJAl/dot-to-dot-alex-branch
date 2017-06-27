/**
 * Created by James on 21/06/2017.
 */
import {OnInit, Component} from "@angular/core";
import {Router} from "@angular/router";
import {AF} from "../providers/af";
import {FirebaseObjectObservable} from "angularfire2/index";
/**
 * Created by James on 22/05/2017.
 */
@Component({
  selector: 'profileEdit-root',
  templateUrl: 'profileEdit.component.html',
  styleUrls: ['profileEdit.component.css']
})


export class ProfileEditComponent implements OnInit {
  error:any;
  user: FirebaseObjectObservable<any>
  constructor(private afService: AF, private router: Router) {
    this.user=this.afService.user;
  }
  ngOnInit(){
  }

  edit($event, description, summary){
    this.afService.editProfile(description, summary).then(()=> {
      this.router.navigate(['/']);
    })
      .catch((error) => {
        this.error = error;
      });
  }

}
