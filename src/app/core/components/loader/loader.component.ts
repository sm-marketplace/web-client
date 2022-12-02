import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoadingStatusService } from '../../services/loading-status.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {

  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingStatusService) { }

  ngOnInit(): void {
  }

}
