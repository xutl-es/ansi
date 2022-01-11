import { describe, it } from '@xutl/test';
import { strictEqual, throws } from 'assert';

import * as ANSI from './ansi';

describe('ansi', () => {
	describe('foreground', () => {
		Object.entries(ANSI.COLORS).forEach(([col, val]) => {
			it(col, () => {
				strictEqual(ANSI.foreground(col as ANSI.COLOR), `\u001b[${val}m`);
			});
			it(`light${col}`, () => {
				strictEqual(ANSI.foreground(`light${col}` as ANSI.COLOR), `\u001b[${val};1m`);
			});
		});
		it('badcolor', () => {
			throws(() => ANSI.foreground('badcolor' as ANSI.COLOR));
		});
		new Array(256).fill(0).forEach((_, idx) => {
			it(`color(${idx})`, () => {
				strictEqual(ANSI.foreground(idx), `\u001b[38;5;${idx}m`);
			});
		});
		it(`color(-1)`, () => {
			throws(() => ANSI.foreground(-1));
		});
		it(`color(256)`, () => {
			throws(() => ANSI.foreground(256));
		});
	});
	describe('background', () => {
		Object.entries(ANSI.COLORS).forEach(([col, val]) => {
			it(col, () => {
				strictEqual(ANSI.background(col as ANSI.COLOR), `\u001b[${val + 10}m`);
			});
			it(`light${col}`, () => {
				strictEqual(ANSI.background(`light${col}` as ANSI.COLOR), `\u001b[${val + 10};1m`);
			});
		});
		it('badcolor', () => {
			throws(() => ANSI.background('badcolor' as ANSI.COLOR));
		});
		new Array(256).fill(0).forEach((_, idx) => {
			it(`color(${idx})`, () => {
				strictEqual(ANSI.background(idx), `\u001b[48;5;${idx}m`);
			});
		});
		it(`color(-1)`, () => {
			throws(() => ANSI.background(-1));
		});
		it(`color(256)`, () => {
			throws(() => ANSI.background(-1));
		});
	});
	describe('decorate', () => {
		it('bold', () => strictEqual(ANSI.decorate('bold'), '\u001b[1m'));
		it('underline', () => strictEqual(ANSI.decorate('underline'), '\u001b[4m'));
		it('reversed', () => strictEqual(ANSI.decorate('reversed'), '\u001b[7m'));
	});
	describe('move', () => {
		it('left', () => strictEqual(ANSI.move(1, 'left'), '\u001b[1D'));
		it('left', () => strictEqual(ANSI.move(2, 'left'), '\u001b[2D'));
		it('right', () => strictEqual(ANSI.move(1, 'right'), '\u001b[1C'));
		it('right', () => strictEqual(ANSI.move(2, 'right'), '\u001b[2C'));
		it('up', () => strictEqual(ANSI.move(1, 'up'), '\u001b[1A'));
		it('up', () => strictEqual(ANSI.move(2, 'up'), '\u001b[2A'));
		it('down', () => strictEqual(ANSI.move(1, 'down'), '\u001b[1B'));
		it('down', () => strictEqual(ANSI.move(2, 'down'), '\u001b[2B'));
		it('nextline', () => strictEqual(ANSI.move(1, 'nextline'), '\u001b[1E'));
		it('nextline', () => strictEqual(ANSI.move(2, 'nextline'), '\u001b[2E'));
		it('prevline', () => strictEqual(ANSI.move(1, 'prevline'), '\u001b[1F'));
		it('prevline', () => strictEqual(ANSI.move(2, 'prevline'), '\u001b[2F'));
		it('position', () => strictEqual(ANSI.position(4, 12), `\u001b[4;12H`));
		it('store', () => strictEqual(ANSI.store(false), `\u001b[s`));
		it('restore', () => strictEqual(ANSI.store(true), `\u001b[u`));
	});
	describe('clear', () => {
		describe('screen', () => {
			it('to start', () => strictEqual(ANSI.clear('screen', 'start'), '\u001b[1J'));
			it('to end', () => strictEqual(ANSI.clear('screen', 'end'), '\u001b[0J'));
			it('all', () => strictEqual(ANSI.clear('screen', 'all'), '\u001b[2J'));
		});
		describe('line', () => {
			it('to start', () => strictEqual(ANSI.clear('line', 'start'), '\u001b[1K'));
			it('to end', () => strictEqual(ANSI.clear('line', 'end'), '\u001b[0K'));
			it('all', () => strictEqual(ANSI.clear('line', 'all'), '\u001b[2K'));
		});
	});
});
