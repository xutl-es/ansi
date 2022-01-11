import * as ANSI from './ansi';

type Colorizer = {
	[Property in ANSI.NAMEDCOLOR]: (...content: any[]) => string;
} & {
	color: (color: number, ...content: any[]) => string;
};
type colorgen = (color: ANSI.COLOR) => string;

export const foreground = genColorizer(ANSI.foreground);
export const background = genColorizer(ANSI.background);
export const decoration = {
	bold: wrap.bind(null, ANSI.decorate('bold')),
	underline: wrap.bind(null, ANSI.decorate('underline')),
	reverse: wrap.bind(null, ANSI.decorate('reversed')),
};
export const screen = {
	clear: (mode: ANSI.CLEAR = 'all') => ANSI.clear('screen', mode),
	position: (row: number, col: number) => ANSI.position(row, col),
	column: (col: number) => ANSI.move(col, 'column'),
	clearLine: (mode: ANSI.CLEAR = 'all') => ANSI.clear('line', mode),
	move: (direction: ANSI.MOVE, count: number = 1) => ANSI.move(count, direction),
};

export default genInterface();

function genInterface() {
	const result: Partial<Colorizer & { foreground: Colorizer; background: Colorizer; screen: typeof screen; reset: () => string } & typeof decoration & typeof screen> = {};
	Object.assign(result, screen);
	Object.assign(result, decoration);
	Object.assign(result, foreground);
	Object.assign(result, screen);
	Object.assign(result, {
		foreground,
		background,
		screen,
		reset: () => ANSI.reset(),
	});
	return result as Colorizer & { foreground: Colorizer; background: Colorizer; screen: typeof screen; reset: () => string } & typeof decoration & typeof screen;
}
function genColorizer(gen: colorgen): Colorizer {
	const result: Partial<Colorizer> = {};
	for (let color of Object.keys(ANSI.COLORS) as ANSI.NAMEDCOLOR[]) {
		result[color] = wrapColor.bind(gen, color);
		result[`light${color}` as ANSI.NAMEDCOLOR] = wrapColor.bind(gen, `light${color}` as ANSI.NAMEDCOLOR);
	}
	result.color = function (color: number, ...content: any[]) {
		return wrapColor.call(gen, color, ...content);
	};
	return result as Colorizer;
}
function wrapColor(this: colorgen, color: ANSI.COLOR, ...content: any[]) {
	return wrap(this(color), ...content);
}
function wrap(cmd: string, ...content: any[]): string {
	content.unshift(cmd);
	content.push(ANSI.reset());
	return content.join('');
}
