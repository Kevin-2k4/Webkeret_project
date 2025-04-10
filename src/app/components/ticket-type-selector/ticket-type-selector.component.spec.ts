import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTypeSelectorComponent } from './ticket-type-selector.component';

describe('TicketTypeSelectorComponent', () => {
  let component: TicketTypeSelectorComponent;
  let fixture: ComponentFixture<TicketTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketTypeSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
