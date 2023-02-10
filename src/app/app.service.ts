import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  delay,
  finalize,
  map,
  of,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private aleatoryNumber = new BehaviorSubject<number | null>(null);
  aleatoryNumber$ = this.aleatoryNumber.asObservable();

  isLoading$: Observable<boolean> = this.aleatoryNumber$.pipe(
    map((number) => number === null)
  );

  constructor() {}

  refreshNumber() {
    this.aleatoryNumber.next(null);
    this.generateAletoryNumber()
      .pipe(tap((aleatoryNumber) => this.aleatoryNumber.next(aleatoryNumber)))
      .subscribe();
  }

  private generateAletoryNumber(): Observable<number> {
    return of(
      Math.floor(
        Math.random() *
          Math.floor(Math.random() * Math.floor(Math.random() * 1_000_000))
      )
    ).pipe(delay(1000));
  }
}
