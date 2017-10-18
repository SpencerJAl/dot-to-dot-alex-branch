import { Component, OnInit } from '@angular/core';
import {DonutChart} from './donutchart';
import { ChartModule} from 'primeng/primeng';
import {PageEvent} from '@angular/material';
import {AF} from '../providers/af';
import {FirebaseListObservable} from 'angularfire2/database';



@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})


export class ProjectSummaryComponent implements OnInit {
  donut: DonutChart;
  pageEvent: PageEvent;
  projects: FirebaseListObservable<any>;
  constructor(afService: AF) {
    this.donut = new DonutChart(100, 200, 30, 40, 3, 5);
    this.projects = afService.projects;
  }
  ngOnInit() {

  }

}
