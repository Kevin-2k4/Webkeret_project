import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  featuredConcerts = [
    {
      id: 1,
      title: 'Summer Festival',
      date: new Date('2025-08-15'),
      venue: 'Central Park',
      image: 'assets/images/concert1.jpg',
      price: 49.99
    },
    {
      id: 2,
      title: 'Rock Legends',
      date: new Date('2025-09-20'),
      venue: 'Madison Square Garden',
      image: 'assets/images/concert2.jpg',
      price: 89.99
    }
  ];
}