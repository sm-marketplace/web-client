import { forkJoin, from, Observable, Observer, of, switchMap, tap, throwError } from "rxjs";
import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { LOG } from "./log.utils";
import { METAMASK_NOT_INSTALLED } from "../core/errors/errors";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export class Web3Utils {

  static detectProvider() {
    if (!window.ethereum) return throwError(() => METAMASK_NOT_INSTALLED);

    const promise = detectEthereumProvider();
    return from(promise);
  }

  static consultChainId() {
    if (!window.ethereum) return throwError(() => METAMASK_NOT_INSTALLED);

    const promise = window.ethereum.request({ method: 'eth_chainId' });
    return from(promise) as Observable<string>
  }

  static consultAccount() {
    if (!window.ethereum) return throwError(() => METAMASK_NOT_INSTALLED);

    const promise = window.ethereum.request({ method: 'eth_accounts' })
    return from(promise) as Observable<string>
  }

  /**
   * A diferencia de consultAccount, en este método si no existen 
   * cuentas conectadas abre el popup de metamask para la conexión
   * @returns Observable<string[]>
   */
  static requestAccount() {
    if (!window.ethereum) return throwError(() => METAMASK_NOT_INSTALLED);

    const promise = window.ethereum.request({ method: 'eth_requestAccounts' })
    return from(promise) as Observable<string>
  }

  static isConnected() {
    if (!window.ethereum) throw METAMASK_NOT_INSTALLED;

    return window.ethereum.isConnected();
  }

  static connectToApp() {
    if (!window.ethereum) return throwError(() => METAMASK_NOT_INSTALLED);

    return Web3Utils.requestAccount().pipe(
      switchMap( _ => Web3Utils.detectProvider()),
      switchMap(provider => forkJoin({
          provider: of(provider),
          chainId: Web3Utils.consultChainId(),
          accountAddress: Web3Utils.consultAccount(),
        }),
      ),
      tap(res => LOG.msg(`User connected (${res.accountAddress})`, "success"))
    );
  }
}