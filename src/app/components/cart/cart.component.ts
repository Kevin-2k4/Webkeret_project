import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(public cartService: CartService) {}

  updateQuantity(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const newQuantity = parseInt(input.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      this.cartService.updateQuantity(index, newQuantity);
    } else {
      input.value = this.cartService.getCartItems()[index].quantity.toString();
    }
  }

  removeItem(index: number): void {
    if (confirm('Biztosan törlöd ezt az elemet a kosárból?')) {
      this.cartService.removeItem(index);
    }
  }

  calculateItemTotal(price: number, quantity: number): number {
    return price * quantity;
  }

  checkout(): void {
    this.cartService.checkout();  
  }
}
