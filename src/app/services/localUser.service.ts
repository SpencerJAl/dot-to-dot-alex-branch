/**
 * Created by James on 22/05/2017.
 */
import {Injectable} from "@angular/core";
import {GetUsers} from "../localStorage/users";
/**
 * Created by James on 22/05/2017.
 */
@Injectable()
export class UserService extends GetUsers{
  constructor(){
    super();
    console.log('MarkerService Initialized...');
    this.load();
  }

  getUsers(){
    var users = JSON.parse(localStorage.getItem('users'));
    return users;
  }
}
