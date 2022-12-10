import { Initializer } from './abstract-initializer';

export function makeFactory<T extends Initializer>( ) {
  return (initializer: T) => initializer.init()
}