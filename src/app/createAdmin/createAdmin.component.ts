/**
 * Created by James on 05/06/2017.
 */
import {Component} from "@angular/core";
import {AF} from "../providers/af";
import {Router} from "@angular/router";
/**
 * Created by James on 05/06/2017.
 */
@Component({
  selector: 'app-createAdmin',
  templateUrl: './createAdmin.component.html',
  styleUrls: ['./createAdmin.component.scss']
})
export class CreateAdminComponent {

  public error: any;

  constructor(private afService: AF, private router: Router) { }

  registerAdmin(event, name, email, password) {
    event.preventDefault();
    this.afService.registerUser(email, password).then((user) => {
      this.afService.saveAdminInfoFromForm(user.uid, name, email).then(() => {
        this.router.navigate(['/accountSetup']);
      })
        .catch((error) => {
          this.error = error;
        });
    })
      .catch((error) => {
        this.error = error;
        console.log(this.error);
      });
  }
}
