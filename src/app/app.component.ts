import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  aleatoryNumber$ = this.appService.aleatoryNumber$;
  isLoading$ = this.appService.isLoading$;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.refreshNumber();
  }

  refreshNumber() {
    this.appService.refreshNumber();
  }
}
