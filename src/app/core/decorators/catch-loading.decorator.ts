import { finalize, map, Observable, of, switchMap, tap } from "rxjs";
import { LoadingStatusFactory } from "../services/loading.status.factory";
import { LOG } from '../../utils/log.utils'
export function useLoading() {
  return function (target: any, memberName: string, descriptor: PropertyDescriptor) {
    return {
      get() {

        const wrapperFn = (...args: any[]) => {
          const fn = descriptor.value;
          const loadingService = LoadingStatusFactory.controller;

          return of('').pipe(
            tap((_) => loadingService.startCall()),
            tap((_) => LOG.msg(`[Loading] ini | calls: ${loadingService.getActiveCalls()})`, "info")),

            switchMap((_) => fn.apply(this, args) as Observable<any>),

            finalize(() => {
              loadingService.endCall()
              LOG.msg(`[Loading] end | calls: ${loadingService.getActiveCalls()})`, "info")
            })
          );
        }

        Object.defineProperty(this, memberName, {
            value: wrapperFn,
            configurable: true,
            writable: true
        });

        return wrapperFn;
      }
    }
  };
}

const deprecated = (deprecationReason: string) => {
  return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
    return {
      get() {
        const wrapperFn = (...args: any[]) => {
          console.warn(`Method ${memberName} is deprecated with reason: ${deprecationReason}`);
          propertyDescriptor.value.apply(this, args)
        }

        Object.defineProperty(this, memberName, {
            value: wrapperFn,
            configurable: true,
            writable: true
        });
        return wrapperFn;
      }
    }
  }
}