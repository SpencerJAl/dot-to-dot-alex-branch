import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecycledSupplierComponent } from './recycled-supplier.component';

describe('RecycledSupplierComponent', () => {
  let component: RecycledSupplierComponent;
  let fixture: ComponentFixture<RecycledSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecycledSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecycledSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
