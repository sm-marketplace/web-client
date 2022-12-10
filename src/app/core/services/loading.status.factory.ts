import { Injectable } from "@angular/core";
import { LoadingStatusService } from "./loading-status.service";

@Injectable({
  providedIn: 'root'
})
export class LoadingStatusFactory {
  
  static controller: LoadingStatusService;

  constructor(controller: LoadingStatusService) {
    LoadingStatusFactory.controller = controller;
  }
}