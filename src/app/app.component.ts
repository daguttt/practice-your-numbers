import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  randomNum$ = this.appService.randomNum$;
  isLoading$ = this.appService.isLoading$;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.refreshNumber();
  }

  refreshNumber() {
    this.appService.refreshNumber();
  }
}
