import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmtextComponent } from './confirmtext.component';

describe('ConfirmtextComponent', () => {
  let component: ConfirmtextComponent;
  let fixture: ComponentFixture<ConfirmtextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmtextComponent]
    });
    fixture = TestBed.createComponent(ConfirmtextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
