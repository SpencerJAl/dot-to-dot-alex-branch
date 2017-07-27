/**
 * Created by James on 21/06/2017.
 */
import {OnInit, Component} from "@angular/core";
import {Router} from "@angular/router";
import {AF} from "../providers/af";
import {FirebaseObjectObservable} from "angularfire2/database";
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

  options = [
    {name:'Art', value:'Art', checked:false},
    {name:'Technology', value:'Technology', checked:false},
    {name:'Gardening', value:'Gardening', checked:false},
    {name:'Cooking', value:'Cooking', checked:false},
    {name:'Trades', value:'Trades', checked:false},
  ];

  get selectedOptions() { // right now: ['1','3']
    return this.options
      .filter(opt => opt.checked)
      .map(opt => opt.value)
  }

  ngOnInit(){
  }

  edit($event, description, summary){
    this.afService.editProfile(description, summary, this.selectedOptions).then(()=> {
      this.router.navigate(['/']);
    })
      .catch((error) => {
        this.error = error;
      });
  }

}
