export class MetamaskNotInstalledError extends Error {
  constructor(msg: string) {
      super(msg);

      // Set the prototype explicitly.
      Object.setPrototypeOf(this, MetamaskNotInstalledError.prototype);
  }
}