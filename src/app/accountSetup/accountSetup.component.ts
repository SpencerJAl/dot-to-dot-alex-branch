import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AF} from '../providers/af';
@Component({
  selector: 'app-accountSetup',
  templateUrl: './accountSetup.component.html',
  styleUrls: ['./accountSetup.component.scss']
})
export class AccountSetupComponent {
  error: any;
  interests= {};

  options = [
    {name: 'Art', value: 'Art & Design', checked: false},
    {name: 'Science', value: 'Science', checked: false},
    {name: 'Health', value: 'Health', checked: false},
    {name: 'Craft', value: 'Craft & Workshop', checked: false},
    {name: 'Education', value: 'Education', checked: false},
  ];
  constructor(private afService: AF, private router: Router) { }




  get selectedOptions() { // right now: ['1','3']
    return this.options
      .filter(opt => opt.checked)
      .map(opt => opt.value);
  }

  register($event, description, summary) {
    event.preventDefault();
    console.log('description is' + description);
    console.log('summary is ' + summary);
    console.log('call works');
    this.afService.createProfile(description, summary, this.selectedOptions).then(() => {
      this.router.navigate(['/']);
    })
      .catch((error) => {
        this.error = error;
      });
  }



}
