import { Injectable } from '@angular/core';
import { Concert } from '../models/concert';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  private concerts: Concert[] = [
    {
      id: 1,
      name: 'Summer Music Festival',
      date: new Date('2025-08-15'),
      venue: 'Central Park',
      imageUrl: '../assets/summer.png',
      description: 'Évente megrendezett nyári zenei fesztivál',
      price: 49.99
    },
    {
      id: 2,
      name: 'Rock Legends Live',
      date: new Date('2025-09-20'),
      venue: 'Madison Square Garden',
      imageUrl: '../../assets/rock.png',
      description: 'A legnagyobb rocklegendák élő koncertje',
      price: 89.99
    },
    {
      id: 3,
      name: 'Jazz Night',
      date: new Date('2025-10-05'),
      venue: 'Blue Note Club',
      imageUrl: '../../assets/jazz.png',
      description: 'Éjszakai jazz koncert a város szívében',
      price: 39.99
    }
  ];

  getAllConcerts(): Concert[] {
    return this.concerts;
  }

  getConcertById(id: number): Concert | undefined {
    return this.concerts.find(concert => concert.id === id);
  }
}