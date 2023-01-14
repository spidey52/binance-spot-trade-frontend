import { TRADE } from './../types/trade';

export const calculateProfit = (trade: TRADE) => {
	const { buyPrice, sellPrice, quantity } = trade;

	return (sellPrice - buyPrice) * quantity * (1 - 0.2);

}

export const calculateProfitPercentage = (trade: TRADE) => {
	const { buyPrice, sellPrice } = trade;

	return (sellPrice - buyPrice) / buyPrice * 100;
}

export const calculateTotalProfit = (trades: TRADE[]) => {
	return trades.reduce((acc, trade) => acc + calculateProfit(trade), 0);
}