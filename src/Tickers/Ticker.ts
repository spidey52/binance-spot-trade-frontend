import { colors } from '@mui/material';

export enum TickerCompare {
	Equal = 0,
	Higher = 1,
	Lower = -1,
}

class Ticker {

	private name: string;
	private price: number;
	private lastPrice: number;

	constructor(name: string, price: number, lastPrice: number) {
		this.name = name;
		this.price = price;
		this.lastPrice = lastPrice;
	}

	public getName(): string {
		return this.name;
	}

	public getPrice(): number {
		return this.price;
	}

	public setPrice(price: number, prevPrice: number): void {
		this.lastPrice = prevPrice;
		this.price = price;
	}

	public toString(): string {
		return `${this.name} : ${this.price}`;
	}

	public comparePrice(): TickerCompare {
		if (this.price < this.lastPrice) return TickerCompare.Lower;
		if (this.price > this.lastPrice) return TickerCompare.Higher;
		return TickerCompare.Equal;
	}

	public getColor(): string {
		const compare = this.comparePrice();
		if (compare === TickerCompare.Higher) return colors.green[500];
		if (compare === TickerCompare.Lower) return colors.red[500];
		return colors.grey[500];
	}

}

export default Ticker;