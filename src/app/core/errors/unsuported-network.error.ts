export class UnsuportedNetworkError extends Error {
  constructor(msg: string) {
      super(msg);

      // Set the prototype explicitly.
      Object.setPrototypeOf(this, UnsuportedNetworkError.prototype);
  }
}