import { Component } from '@angular/core';
import { WalletService } from './services/contract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-client';

  constructor(){
  }

  ngOnInit(): void {
  }
}
