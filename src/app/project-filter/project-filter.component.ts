import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable } from 'rxjs';

import {ProjectFilterDataService} from './project-filter-data.service';
import {MarkersService} from '../maps/markers.service';
import {AF} from '../providers/af';
import {User} from '../providers/user';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent implements OnInit {
  // artAndDesign: BehaviorSubject<boolean>  ;
  // artAndDesign = new BehaviorSubject(true);
  art: boolean;
  craft: boolean;
  education: boolean;
  health: boolean;
  science: boolean;
  projectName: string;
  projectType: string;
  projectID: string;
  users: any = [];
  members = [];
  constructor(private AF: AngularFireDatabase , private projectFilterData: ProjectFilterDataService, private markerService: MarkersService, private cd: ChangeDetectorRef, private afService: AF) {


  }

  ngOnInit() {
    this.projectFilterData.currentArt.subscribe(art => this.art = art);
    this.changeArtFlag(false);
    this.projectFilterData.currentSci.subscribe(science => this.science = science);
    this.changeSciFlag(false);
    this.projectFilterData.currentHealth.subscribe(health => this.health = health);
    this.changeHealthFlag(false);
    this.projectFilterData.currentEdu.subscribe(education => this.education = education);
    this.changeEduFlag(false);
    this.projectFilterData.currentCraft.subscribe(craft => this.craft = craft);
    this.changeCraftFlag(false);
    console.log('Art and Design is ' + this.art);



    this.markerService.currentProjectName.subscribe(projectName => this.projectName = projectName );
    this.markerService.currentProjectType.subscribe(projectType => this.projectType = projectType );
    this.markerService.currentProjectID.subscribe(projectID => {
      this.afService.getProjectMembers(projectID).subscribe((mem) => {
        for (const u of mem){
          const memb = this.afService.getUser(u.id);
          this.AF.object('registeredUsers/' + u.id).subscribe((us) => {
            this.members.push(us);
          });
        }
      });
      this.cd.markForCheck();
      console.log('subscriber for notifications fired ' + this.projectName );
    });
    for (const u of this.users){
      this.afService.getUser(u.id).subscribe((user) => {
        this.members.push(user);
      });
    }
    this.cd.detectChanges();
  }
  changeArtFlag(currentArtFlag: boolean) {
    this.projectFilterData.changeArt(currentArtFlag);
    console.log('current art value ' + currentArtFlag);
    console.log('value of art confirmed as ' + this.art);
    // console.log("value in service for  currentArt " + this.projectFilterData.art);
  }
  changeEduFlag(currentEduFlag: boolean) {
    this.projectFilterData.changeEdu(currentEduFlag);

  }
  changeCraftFlag(currentCraftFlag: boolean) {
    this.projectFilterData.changeCraft(currentCraftFlag);

  }
  changeSciFlag(currentSciFlag: boolean) {
    this.projectFilterData.changeScience(currentSciFlag);
  }
  changeHealthFlag(currentHealthFlag: boolean) {
    this.projectFilterData.changeHealth(currentHealthFlag);
    // console.log("value in service for  currentArt " + this.projectFilterData.art);
  }

}
