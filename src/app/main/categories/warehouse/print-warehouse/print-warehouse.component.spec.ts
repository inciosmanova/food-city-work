import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintWarehouseComponent } from './print-warehouse.component';

describe('PrintWarehouseComponent', () => {
  let component: PrintWarehouseComponent;
  let fixture: ComponentFixture<PrintWarehouseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintWarehouseComponent]
    });
    fixture = TestBed.createComponent(PrintWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
