import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of, tap } from 'rxjs';

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
    return of(this.getRandomNumber(1, this.getRandomNumber(1, 1_000_000))).pipe(
      delay(1000)
    );
  }

  private getRandomNumber(minNum: number, maxNum: number) {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
  }
}
