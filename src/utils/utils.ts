export const normalizeSrc = (src: string): string =>
  src[0] === '/' ? src.slice(1) : src;

export const padNumber = (value: number): string => {
  if (value > 10) return value.toString();

  const stringValue = value.toString();
  return stringValue.padStart(2, '0');
};

export const cleanseString = (word: string): string =>
  word.replace(/[^A-Z0-9]/gi, '');

const smTailwindBreakpoint = 640;
export const isScreenSizeMobile = (width: number): boolean =>
  width < smTailwindBreakpoint;
