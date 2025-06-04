export const randomDirection = () => Math.random() > 0.5 ? 1 : -1;
export const randomAlphaNumStr = () =>
  btoa(Math.random() * 1000000).replace(/[^a-zA-Z0-9]/g, '');
