import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMmfComponent } from './new-mmf.component';

describe('NewMmfComponent', () => {
  let component: NewMmfComponent;
  let fixture: ComponentFixture<NewMmfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMmfComponent]
    });
    fixture = TestBed.createComponent(NewMmfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
