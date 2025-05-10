import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  isLoading = false;
  checkoutSuccess = false;
  errorMessage: string | null = null;

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  checkout(): void {
    if (this.cartService.getCartItems().length === 0) {
      this.errorMessage = 'Your cart is empty';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.cartService.checkout().subscribe({
      next: () => {
        this.checkoutSuccess = true;
        this.isLoading = false;

        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 2000);
      },
      error: (err) => {
        console.error('Checkout failed:', err);
        this.errorMessage = 'Checkout failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
