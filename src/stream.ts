import { foreground, background, COLOR } from './ansi';
import { decorate, reset, move, position, store } from './ansi';
import { clear, CLEAR } from './ansi';

export interface Writable {
	write(data: string): void;
	end?: () => void;
}
export class Stream implements Writable {
	#base: Writable;
	constructor(base: Writable) {
		this.#base = base;
		this.reset();
	}
	public foreground(color: COLOR) {
		this.#base.write(foreground(color));
		return this;
	}
	public background(color: COLOR) {
		this.#base.write(background(color));
		return this;
	}
	public bold() {
		this.#base.write(decorate('bold'));
		return this;
	}
	public underline() {
		this.#base.write(decorate('underline'));
		return this;
	}
	public reverse() {
		this.#base.write(decorate('reversed'));
		return this;
	}
	public reset() {
		this.#base.write(reset());
		return this;
	}
	public left(count: number = 1) {
		this.#base.write(move(count, 'left'));
		return this;
	}
	public right(count: number = 1) {
		this.#base.write(move(count, 'right'));
		return this;
	}
	public up(count: number = 1) {
		this.#base.write(move(count, 'up'));
		return this;
	}
	public down(count: number = 1) {
		this.#base.write(move(count, 'down'));
		return this;
	}
	public nextLine(count: number = 1) {
		this.#base.write(move(count, 'nextline'));
		return this;
	}
	public previousLine(count: number = 1) {
		this.#base.write(move(count, 'prevline'));
		return this;
	}
	public column(count: number = 0) {
		this.#base.write(move(count, 'column'));
		return this;
	}

	public position(row: number, col: number) {
		this.#base.write(position(row, col));
		return this;
	}
	public storePosition() {
		this.#base.write(store(false));
		return this;
	}
	public restorePosition() {
		this.#base.write(store(true));
		return this;
	}

	public clearLine(mode: CLEAR) {
		this.#base.write(clear('line', mode));
		return this;
	}
	public clearScreen(mode: CLEAR) {
		this.#base.write(clear('screen', mode));
		return this;
	}

	public write(...data: any[]) {
		this.#base.write(data.join(' '));
		return this;
	}
	public end(...data: any[]) {
		this.write(...data);
		this.reset();
		if ('function' === typeof this.#base.end) this.#base.end();
	}
}
