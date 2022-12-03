import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  env = environment;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
