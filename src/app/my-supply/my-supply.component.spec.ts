import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySupplyComponent } from './my-supply.component';

describe('MySupplyComponent', () => {
  let component: MySupplyComponent;
  let fixture: ComponentFixture<MySupplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySupplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
