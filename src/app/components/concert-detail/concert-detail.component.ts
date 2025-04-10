import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  OnInit 
} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule 
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketTypeSelectorComponent } from '../ticket-type-selector/ticket-type-selector.component';
import { DurationPipe } from '../../pipes/duration.pipe';
import { CartService } from '../../services/cart.service'; 

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-concert-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TicketTypeSelectorComponent,
    DurationPipe,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatTabsModule,
    MatExpansionModule,
    MatDividerModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './concert-detail.component.html',
  styleUrls: ['./concert-detail.component.scss']
})
export class ConcertDetailComponent implements OnInit {
  @Input() concert: any;
  @Output() ticketSelected = new EventEmitter<any>();

  activeTab = 0;
  similarEvents = []; 
  searchForm: FormGroup;
  ticketForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService 
  ) {
    this.searchForm = this.fb.group({
      searchQuery: ['', [Validators.minLength(2)]]
    });

    this.ticketForm = this.fb.group({
      ticketType: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  ngOnInit(): void {}

  onTicketSelected(ticketData: { type: string, price: number, quantity: number }) {
    this.cartService.addToCart({
      concertId: this.concert.id,
      ticketType: ticketData.type,
      price: ticketData.price,
      quantity: ticketData.quantity
    });
  }
}
