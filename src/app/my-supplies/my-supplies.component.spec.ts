import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySuppliesComponent } from './my-supplies.component';

describe('MySuppliesComponent', () => {
  let component: MySuppliesComponent;
  let fixture: ComponentFixture<MySuppliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySuppliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
