import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  delay,
  finalize,
  of,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private aleatoryNumber = new Subject<number | null>();
  aleatoryNumber$ = this.aleatoryNumber.asObservable();

  private isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoading.asObservable();

  constructor() {}

  refreshNumber() {
    this.markAsLoading();
    this.aleatoryNumber.next(null);
    this.getAleatoryNumber()
      .pipe(
        tap((aleatoryNumber) => this.aleatoryNumber.next(aleatoryNumber)),
        finalize(() => this.clearLoading())
      )
      .subscribe();
  }

  markAsLoading() {
    this.isLoading.next(true);
  }

  clearLoading() {
    this.isLoading.next(false);
  }

  private getAleatoryNumber(): Observable<number> {
    return of(Math.floor(Math.random() * 1_000_000)).pipe(delay(1000));
  }
}
