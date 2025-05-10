import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { Concert } from '../models/concert';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{
    user: User | null,
    concerts: Concert[],
    stats: {
      total: number,
      upcoming: number,
      past: number
    }
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null,
            concerts: [],
            stats: { total: 0, upcoming: 0, past: 0 }
          });
        }

        return from(this.fetchUserWithConcerts(authUser.uid));
      })
    );
  }

  private async fetchUserWithConcerts(userId: string): Promise<{
    user: User | null,
    concerts: Concert[],
    stats: {
      total: number,
      upcoming: number,
      past: number
    }
  }> {
    try {
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);
      
      if (!userSnapshot.exists()) {
        return {
          user: null,
          concerts: [],
          stats: { total: 0, upcoming: 0, past: 0 }
        };
      }

      const userData = userSnapshot.data() as Omit<User, 'id'>;
      const user: User = { ...userData, id: userId };

      if (!user.concerts || user.concerts.length === 0) {
        return {
          user,
          concerts: [],
          stats: { total: 0, upcoming: 0, past: 0 }
        };
      }

      const concertsCollection = collection(this.firestore, 'Concerts');
      const concertQuery = query(concertsCollection, where('id', 'in', user.concerts));
      const concertSnapshot = await getDocs(concertQuery);

      const concerts: Concert[] = [];
      concertSnapshot.forEach(docSnap => {
        const data = docSnap.data();
        concerts.push({
          id: Number(docSnap.id),
          name: data['name'],
          date: new Date(data['date']),
          venue: data['venue'],
          imageUrl: data['imageurl'],
          description: data['description'],
          price: data['price']
        });
      });

      const total = concerts.length;
      const now = new Date();
      const upcoming = concerts.filter(c => c.date > now).length;
      const past = total - upcoming;

      return {
        user,
        concerts,
        stats: {
          total,
          upcoming,
          past
        }
      };

    } catch (error) {
      console.error('Hiba a felhasználói vagy koncert adatok betöltésekor:', error);
      return {
        user: null,
        concerts: [],
        stats: { total: 0, upcoming: 0, past: 0 }
      };
    }
  }
  addConcertsToUser(newConcertIds: string[]): Observable<void> {
  return this.authService.currentUser.pipe(
    switchMap(authUser => {
      if (!authUser) return of(undefined);

      const userRef = doc(this.firestore, 'Users', authUser.uid);
      return from(getDoc(userRef)).pipe(
        switchMap(snapshot => {
          const currentConcerts: string[] = snapshot.exists()
            ? snapshot.data()['concerts'] || []
            : [];

          const updatedConcerts = Array.from(new Set([...currentConcerts, ...newConcertIds]));

          return from(updateDoc(userRef, { concerts: updatedConcerts }));
        })
      );
    })
  );
}


}
