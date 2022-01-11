export const START = '\u001b[';
export const END = 'm';
export const RESET = '0';

export const COLORS = {
	black: 30,
	red: 31,
	green: 32,
	yellow: 33,
	blue: 34,
	magenta: 35,
	cyan: 36,
	white: 37,
};
export type FLATCOLOR = keyof typeof COLORS;
export type BRIGHTCOLOR<TKEY> = TKEY extends FLATCOLOR ? `light${TKEY}` : never;
export type NAMEDCOLOR = FLATCOLOR | BRIGHTCOLOR<FLATCOLOR>;
export type COLOR = NAMEDCOLOR | number;

export const Colors = Object.keys(COLORS)
	.map((c) => [c, `light${c}`])
	.flat();

export function foreground(c: COLOR) {
	if (Number.isInteger(c)) {
		if (c < 0 || c > 255) throw new RangeError(`invalid color ${c}`);
		return `${START}38;5;${c}${END}`;
	}
	if ('string' !== typeof c) throw new RangeError(`invalid color ${c}`);
	const bright = /^light/.test(c);
	if (bright) {
		c = c.replace(/^light/, '') as COLOR;
	}
	if (c in COLORS) {
		return `${START}${COLORS[c as keyof typeof COLORS]}${bright ? ';1' : ''}${END}`;
	}
	throw new RangeError(`invalid color ${c}`);
}
export function background(c: COLOR) {
	if (Number.isInteger(c)) {
		if (c < 0 || c > 255) throw new RangeError(`invalid color ${c}`);
		return `${START}48;5;${c}${END}`;
	}
	if ('string' !== typeof c) throw new RangeError(`invalid color ${c}`);
	const bright = /^light/.test(c);
	if (bright) {
		c = c.replace(/^light/, '') as COLOR;
	}
	if (c in COLORS) {
		return `${START}${COLORS[c as keyof typeof COLORS] + 10}${bright ? ';1' : ''}${END}`;
	}
	throw new RangeError(`invalid color ${c}`);
}

export const DECORATIONS = {
	bold: 1,
	underline: 4,
	reversed: 7,
};
export type DECORATION = keyof typeof DECORATIONS;
export function decorate(d: DECORATION) {
	return `${START}${DECORATIONS[d]}${END}`;
}

export const MOVES = {
	up: 'A',
	down: 'B',
	right: 'C',
	left: 'D',
	nextline: 'E',
	prevline: 'F',
	column: 'G',
};
export type MOVE = keyof typeof MOVES;
export function move(count: number, direction: MOVE) {
	return `${START}${count}${MOVES[direction]}`;
}
export function position(row: number, col: number) {
	return `${START}${row};${col}H`;
}
export function store(restore: boolean = false) {
	return `${START}${restore ? 'u' : 's'}`;
}

export const CLEARS = {
	end: 0,
	start: 1,
	all: 2,
};
export type CLEAR = keyof typeof CLEARS;
export function clear(what: 'screen' | 'line', mode: CLEAR) {
	return `${START}${CLEARS[mode]}${what === 'screen' ? 'J' : 'K'}`;
}

export function reset() {
	return `${START}0${END}`;
}
