import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { Concert } from '../../models/concert';
import { UserService } from '../../services/user.service';
import { ConcertService } from '../../services/concert.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  concerts: Concert[] = [];
  stats = {
    total: 0,
    upcoming: 0,
    past: 0
  };
  isLoading = true;
  error: string | null = null;
  today = new Date();

  private subscription: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private concertService: ConcertService, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProfileData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadProfileData(): void {
    this.isLoading = true;
    this.error = null;

    this.subscription = this.userService.getUserProfile().subscribe({
      next: async (profile) => {
        this.user = profile.user;

        const concertIds = profile.user?.concerts || [];

        try {
          const concerts = await Promise.all(
            concertIds.map((id: any) =>
              Promise.resolve(this.concertService.getConcertById(Number(id)))
            )
          );

          this.concerts = concerts.filter((concert): concert is Concert => !!concert);
          this.calculateStats();
        } catch (error) {
          console.error('Hiba történt a koncertek betöltésekor:', error);
          this.error = 'Nem sikerült a koncertjegyek betöltése.';
        } finally {
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Hiba történt a profil betöltése közben:', err);
        this.error = 'Hiba történt a profil betöltése közben.';
        this.isLoading = false;
      }
    });
  }

  private calculateStats(): void {
    this.stats = {
      total: this.concerts.length,
      upcoming: this.getUpcomingConcerts().length,
      past: this.getPastConcerts().length
    };
  }

  getUpcomingConcerts(): Concert[] {
    return this.concerts.filter(c => new Date(c.date) > this.today);
  }

  getPastConcerts(): Concert[] {
    return this.concerts.filter(c => new Date(c.date) <= this.today);
  }

  refresh(): void {
    this.loadProfileData();
  }
  logout() {
    localStorage.removeItem('user');
    this.authService.signOut()
    this.router.navigate(['/login']);
}

}
