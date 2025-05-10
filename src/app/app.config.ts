import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyBGXlRRa7wS0i-zthq7cbubxPMoUe6ABNI",
  authDomain: "jegy-ed6cd.firebaseapp.com",
  projectId: "jegy-ed6cd",
  storageBucket: "jegy-ed6cd.appspot.com",
  messagingSenderId: "1009157522293",
  appId: "1:1009157522293:web:97018c48d4c5fdc108493c",
  measurementId: "G-PSFETPLBW7"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
