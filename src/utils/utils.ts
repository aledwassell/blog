export const normalizeSrc = (src: string): string => (src[0] === '/' ? src.slice(1) : src);
