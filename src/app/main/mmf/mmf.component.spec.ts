import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmfComponent } from './mmf.component';

describe('MmfComponent', () => {
  let component: MmfComponent;
  let fixture: ComponentFixture<MmfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MmfComponent]
    });
    fixture = TestBed.createComponent(MmfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
