import { Component, OnInit } from '@angular/core';
import {DonutChart} from './donutchart';
import{ ChartModule} from 'primeng/primeng';
import {PageEvent} from '@angular/material';



@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css']
})


export class ProjectSummaryComponent implements OnInit {
  donut:DonutChart;
  pageEvent: PageEvent;
  constructor() {
    this.donut = new DonutChart(100,200,30,40,3,5);
  }

  ngOnInit() {

  }

}
