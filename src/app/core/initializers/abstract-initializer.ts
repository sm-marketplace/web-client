import { Observable } from "rxjs";

export abstract class Initializer {
  abstract init(): () => Observable<any>;
}