import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AF} from "../providers/af";
@Component({
  selector: 'app-accountSetup',
  templateUrl: './accountSetup.component.html',
  styleUrls: ['./accountSetup.component.css']
})
export class AccountSetupComponent {
  error:any;

  constructor(private afService: AF, private router: Router) { }

  register($event, description, summary){
    event.preventDefault();
    console.log("description is"+description);
    console.log("summary is "+summary);
    console.log("call works");
    this.afService.createProfile(description, summary).then(()=>{
      this.router.navigate(['/']);
    })
      .catch((error) => {
        this.error = error;
      });
  }

}
