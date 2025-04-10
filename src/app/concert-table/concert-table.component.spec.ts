import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertTableComponent } from './concert-table.component';

describe('ConcertTableComponent', () => {
  let component: ConcertTableComponent;
  let fixture: ComponentFixture<ConcertTableComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
