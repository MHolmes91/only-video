export const randomDirection = (): 1 | -1 =>
  Math.random() > 0.5 ? 1 : -1;

export const randomAlphaNumStr = (): string =>
  btoa(String(Math.random() * 1000000)).replace(/[^a-zA-Z0-9]/g, '');
