import { randomDirection, randomAlphaNumStr } from './utils';

describe('utils', () => {
  test('randomDirection returns either 1 or -1', () => {
    for (let i = 0; i < 100; i++) {
      const val = randomDirection();
      expect([1, -1]).toContain(val);
    }
  });

  test('randomAlphaNumStr returns alphanumeric string', () => {
    const str = randomAlphaNumStr();
    expect(str).toMatch(/^[a-zA-Z0-9]+$/);
  });
});
