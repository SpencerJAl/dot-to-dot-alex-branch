import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppComponent}  from '../app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public  isLoggedIn: boolean;
  constructor() { }

  ngOnInit() {
    this.isLoggedIn = AppComponent.bind(this.isLoggedIn);
  }

}
