import { describe, it } from '@xutl/test';
import { strictEqual, throws } from 'assert';

import wrap from './wrap';
import * as ANSI from './ansi';

describe('wrap', () => {
	describe('foreground', () => {
		ANSI.Colors.forEach((col) => {
			it(col, () => {
				//@ts-expect-error
				strictEqual(wrap.foreground[col]('Philipp'), `${ANSI.foreground(col as ANSI.COLOR)}Philipp\u001b[0m`);
			});
		});
		new Array(256).fill(0).forEach((_, idx) => {
			it(`color(${idx})`, () => {
				strictEqual(wrap.foreground.color(idx, 'Philipp'), `${ANSI.foreground(idx)}Philipp\u001b[0m`);
			});
		});
		it(`color(-1)`, () => {
			throws(() => wrap.foreground.color(-1, 'Philipp'));
		});
		it(`color(256)`, () => {
			throws(() => wrap.foreground.color(256, 'Philipp'));
		});
	});
	describe('background', () => {
		ANSI.Colors.forEach((col) => {
			it(col, () => {
				//@ts-expect-error
				strictEqual(wrap.background[col]('Philipp'), `${ANSI.background(col as ANSI.COLOR)}Philipp\u001b[0m`);
			});
		});
		new Array(256).fill(0).forEach((_, idx) => {
			it(`color(${idx})`, () => {
				strictEqual(wrap.background.color(idx, 'Philipp'), `${ANSI.background(idx)}Philipp\u001b[0m`);
			});
		});
		it(`color(-1)`, () => {
			throws(() => wrap.background.color(-1, 'Philipp'));
		});
		it(`color(256)`, () => {
			throws(() => wrap.background.color(256, 'Philipp'));
		});
	});
	describe('default', () => {
		ANSI.Colors.forEach((col) => {
			it(col, () => {
				//@ts-expect-error
				strictEqual(wrap[col]('Philipp'), `${ANSI.foreground(col as ANSI.COLOR)}Philipp\u001b[0m`);
			});
		});
		new Array(256).fill(0).forEach((_, idx) => {
			it(`color(${idx})`, () => {
				strictEqual(wrap.color(idx, 'Philipp'), `${ANSI.foreground(idx)}Philipp\u001b[0m`);
			});
		});
		it(`color(-1)`, () => {
			throws(() => wrap.color(-1, 'Philipp'));
		});
		it(`color(256)`, () => {
			throws(() => wrap.color(256, 'Philipp'));
		});
	});
});
