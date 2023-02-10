import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private randomNum = new BehaviorSubject<number | null>(null);
  randomNum$ = this.randomNum.asObservable();

  isLoading$: Observable<boolean> = this.randomNum$.pipe(
    map((number) => number === null)
  );

  constructor() {}

  refreshNumber() {
    this.randomNum.next(null);
    this.generateAletoryNumber()
      .pipe(tap((num) => this.randomNum.next(num)))
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
