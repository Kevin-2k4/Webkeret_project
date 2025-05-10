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
      imageUrl: 'assets/summer.png',
      description: 'Évente megrendezett nyári zenei fesztivál',
      price: 49.99
    },
    {
      id: 2,
      name: 'Rock Legends Live',
      date: new Date('2025-09-20'),
      venue: 'Madison Square Garden',
      imageUrl: 'assets/rock.png',
      description: 'A legnagyobb rocklegendák élő koncertje',
      price: 89.99
    },
    {
      id: 3,
      name: 'Jazz Night',
      date: new Date('2025-10-05'),
      venue: 'Blue Note Club',
      imageUrl: 'assets/jazz.png',
      description: 'Éjszakai jazz koncert a város szívében',
      price: 39.99
        },
    {
  id: 4,
  name: 'Classical Evenings',
  date: new Date('2025-11-10'),
  venue: 'Opera House',
  imageUrl: 'assets/classical.png',
  description: 'Klasszikus zenei est neves szólistákkal',
  price: 59.99
},
{
  id: 5,
  name: 'Electronic Beats Night',
  date: new Date('2025-08-30'),
  venue: 'Downtown Arena',
  imageUrl: 'assets/electronic.png',
  description: 'Elektronikus zene hajnalig a legjobb DJ-kkel',
  price: 44.50
},
{
  id: 6,
  name: 'Acoustic Vibes',
  date: new Date('2025-09-12'),
  venue: 'Riverside Café',
  imageUrl: 'assets/acoustic.png',
  description: 'Hangulatos akusztikus est kis létszámú közönségnek',
  price: 29.90
},
{
  id: 7,
  name: 'Hip-Hop Night Jam',
  date: new Date('2025-10-25'),
  venue: 'Urban Club',
  imageUrl: 'assets/hiphop.png',
  description: 'Hazai és külföldi hip-hop előadók fellépése',
  price: 54.00
},
{
  id: 8,
  name: 'Indie & Alternative Fest',
  date: new Date('2025-11-15'),
  venue: 'Open Air Stage',
  imageUrl: 'assets/indie.png',
  description: 'Független zenekarok és alternatív stílus egy színpadon',
  price: 42.75
}

  ];

  getAllConcerts(): Concert[] {
    return this.concerts;
  }

  getConcertById(id: number): Concert | undefined {
    return this.concerts.find(concert => concert.id === id);
  }
  getConcertsByIds(ids: number[]): Concert[] {
    return this.concerts.filter(concert => ids.includes(concert.id));
  }
}