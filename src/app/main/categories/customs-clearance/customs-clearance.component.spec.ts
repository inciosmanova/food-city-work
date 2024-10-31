import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomsClearanceComponent } from './customs-clearance.component';

describe('CustomsClearanceComponent', () => {
  let component: CustomsClearanceComponent;
  let fixture: ComponentFixture<CustomsClearanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomsClearanceComponent]
    });
    fixture = TestBed.createComponent(CustomsClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
