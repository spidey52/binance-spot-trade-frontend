
export type TRADE_STATUS = 'ALL' | 'OPEN' | 'CLOSED' | 'CANCELED';
export type TRADE = {
	_id: string;
	createdAt: Date,
	updatedAt: Date,
	buyPrice: number,
	sellPrice: number,
	quantity: number,
}

export type TICKER = {
	_id: string;
	symbol: string;
}

