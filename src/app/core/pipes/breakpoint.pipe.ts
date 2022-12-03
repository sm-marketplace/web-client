import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Breakpoint } from '../services/breakpoint/breakpoint.model';
import { BreakpointService } from '../services/breakpoint/breakpoint.service';

@Pipe({
  name: 'breakpoint'
})
export class BreakpointPipe implements PipeTransform {

  constructor(private breakpointService: BreakpointService) {}

  transform(sizes: Breakpoint[]): Observable<Boolean> {
    
    return this.breakpointService.$size.pipe(
      map(currentSize => sizes.includes(currentSize))
    );
  }

}
