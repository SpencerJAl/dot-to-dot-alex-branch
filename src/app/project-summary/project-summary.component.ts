import { Component, OnInit } from '@angular/core';
import {DonutChart} from './donutchart';
import { ChartModule} from 'primeng/primeng';
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

  donut: DonutChart;
  pageEvent: PageEvent;
  projects: FirebaseListObservable<any>;
  newProjects;
  suppliers: FirebaseListObservable<any>;
  constructor(afService: AF) {
    this.suppliers = afService.suppliers;
    this.donut = new DonutChart(100, 200, 30, 40, 3, 5);
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
