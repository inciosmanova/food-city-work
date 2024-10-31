import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingPlanComponent } from './sorting-plan.component';

describe('SortingPlanComponent', () => {
  let component: SortingPlanComponent;
  let fixture: ComponentFixture<SortingPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortingPlanComponent]
    });
    fixture = TestBed.createComponent(SortingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
