import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import {PageEvent} from '@angular/material';
import {AF} from '../providers/af';
import {FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {Project} from '../providers/project';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})


export class ProjectSummaryComponent implements OnInit {

   today = new Date();
   date;
   dd: Date;
   mm: Date;
   yyyy: Date;


  pageEvent: PageEvent;
  projects: FirebaseListObservable<any>;
  newProjects;

  suppliers: FirebaseListObservable<any>;
  // Doughnut
  public doughnutChartLabels:string[] = ['Money', 'Money Outstanding', 'Time', 'Time Outstanding', 'Materials', 'Materials Outstanding'];
  public doughnutChartData:number[] = [390, 300, 500, 400, 150, 100];
  public doughnutChartType:string = 'doughnut';
  public doughnutColors:string[] = ['#FF6384', '#FF7495', '#36A2EB', '#47B3EB', '#7CFC00', '#008000'];

  constructor(afService: AF) {
    this.suppliers = afService.suppliers;
    this.projects = afService.projects;
     afService.projects.subscribe((e) => {
       this.newProjects = e.reverse();
    });

    this.date = this.today.getDate() + '-' + ( this.today.getMonth() + 1 ) + '-' + this.today.getFullYear();
  }
ngOnInit() {

  }
  isArchived(project) {
    if (project.startDate != null && project.endDate != null) {
      const sd = new Date(project.startDate);
      const ed = new Date(project.endDate);
      const currDate = new Date();
      if ( currDate > ed) {
        return true;
      } else {
        return false;
      }
    }else {
      return false;
    }
    }
    isCurrent(project) {
      if (project.startDate != null && project.endDate != null) {
        const sd = new Date(project.startDate);
        const ed = new Date(project.endDate);
        const currDate = new Date();
        // alert(currDate);
       // alert (ed);
        if (  ed > currDate) {
          return true;
        } else {
          return false;
        }
      }else {
        return false;
      }
    }
}
