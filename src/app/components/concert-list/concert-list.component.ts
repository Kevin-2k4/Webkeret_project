import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConcertService } from '../../services/concert.service';
import { Concert } from '../../models/concert';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-concert-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './concert-list.component.html',
  styleUrls: ['./concert-list.component.scss']
})
export class ConcertListComponent implements OnInit {
  concerts: Concert[] = [];
  showPopup: boolean = false;

  constructor(
    private concertService: ConcertService,
    private cartService: CartService 
  ) {}

  addToCart(concert: Concert): void {
    const item: CartItem = {
      concertId: concert.id,
      ticketType: 'Standard',
      quantity: 1,
      price: concert.price
    };
    this.cartService.addToCart(item); 
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 3000);
  }

  ngOnInit(): void {
    this.concerts = this.concertService.getAllConcerts();
  }
}
