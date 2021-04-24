import { Ignore, ignoreKey } from './Ignore';

describe('IgnoreDecorator', () => {
  it('should decorate properties', () => {
    class Band {
      id: string;
      foo: string;
      @Ignore()
      bar: string;
    }

    const band = new Band();

    expect(Reflect.getMetadata(ignoreKey, band, 'foo')).toBe(undefined);
    expect(Reflect.getMetadata(ignoreKey, band, 'bar')).toBe(true);
  });
});
