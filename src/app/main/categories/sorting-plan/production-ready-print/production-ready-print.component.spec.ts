import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionReadyPrintComponent } from './production-ready-print.component';

describe('ProductionReadyPrintComponent', () => {
  let component: ProductionReadyPrintComponent;
  let fixture: ComponentFixture<ProductionReadyPrintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionReadyPrintComponent]
    });
    fixture = TestBed.createComponent(ProductionReadyPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
