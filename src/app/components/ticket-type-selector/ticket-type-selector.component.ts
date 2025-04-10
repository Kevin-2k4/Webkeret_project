import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-type-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-type-selector.component.html',
  styleUrls: ['./ticket-type-selector.component.scss']
})
export class TicketTypeSelectorComponent {
  @Input() concert: any;
  @Output() addToCart = new EventEmitter<any>();
  
  selectedTicketType = '';
  quantity = 1;
  
  ticketTypes = [
    { name: 'General Admission', price: 50 },
    { name: 'VIP', price: 120 },
    { name: 'Premium', price: 200 }
  ];

  onAddToCart() {
    this.addToCart.emit({
      concert: this.concert,
      ticketType: this.selectedTicketType,
      quantity: this.quantity,
      price: this.ticketTypes.find(t => t.name === this.selectedTicketType)?.price
    });
  }
}