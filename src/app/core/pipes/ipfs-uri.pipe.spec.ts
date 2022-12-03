import { IpfsURIPipe } from './ipfs-uri.pipe';

describe('IpfsURIPipe', () => {
  it('create an instance', () => {
    const pipe = new IpfsURIPipe();
    expect(pipe).toBeTruthy();
  });
});
