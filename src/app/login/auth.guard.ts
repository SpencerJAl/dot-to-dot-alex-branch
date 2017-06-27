/**
 * Created by davem on 14/02/2017.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {FirebaseObjectObservable} from 'angularfire2';
import {AF} from '../providers/af';

@Injectable()
export class AuthGuard implements CanActivate {
  public user: FirebaseObjectObservable<any>;

  constructor(private router: Router, private afService: AF) {
    this.afService.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.afService.af.database.object('users/' + auth.uid);

        }
      });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ('user'){

      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
