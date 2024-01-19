export const normalizeSrc = (src: string): string => (src[0] === '/' ? src.slice(1) : src);

export const padNumber = (value: number): string => {
	if (value > 10) return value.toString();

	const stringValue = value.toString();
	return stringValue.padStart(2, '0');
};

const smTailwindBreakpoint = 640;
export const isScreenSizeMobile = (width: number): boolean => width < smTailwindBreakpoint;
