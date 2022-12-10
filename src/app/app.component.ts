import { Component } from '@angular/core';
import { LoadingStatusService } from './core/services/loading-status.service';
import { LoadingStatusFactory } from './core/services/loading.status.factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-client';

  constructor(private loadingStatusFactory: LoadingStatusFactory){
    this.loadingStatusFactory
  }

  ngOnInit(): void {
  }
}
