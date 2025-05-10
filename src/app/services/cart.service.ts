import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserService } from './user.service';

export interface CartItem {
  concertId: number;
  ticketType: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  constructor(private userService: UserService) {}

  addToCart(item: CartItem) {
    const existing = this.cartItems.find(i => i.concertId === item.concertId && i.ticketType === item.ticketType);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.cartSubject.next(this.cartItems);
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.cartSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

  updateQuantity(index: number, newQuantity: number) {
    this.cartItems[index].quantity = newQuantity;
    this.cartSubject.next(this.cartItems);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  checkout(): Observable<any> {
    const items = this.cartItems.map(item => ({
      concertId: item.concertId,
      ticketType: item.ticketType,
      quantity: item.quantity
    }));

    return this.userService.addConcertsToUser(items.map(item => item.concertId.toString())).pipe(
      tap(() => this.clearCart())
    );
  }
}
