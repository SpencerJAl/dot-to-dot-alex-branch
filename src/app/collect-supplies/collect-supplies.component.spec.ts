import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectSuppliesComponent } from './collect-supplies.component';

describe('CollectSuppliesComponent', () => {
  let component: CollectSuppliesComponent;
  let fixture: ComponentFixture<CollectSuppliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectSuppliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
