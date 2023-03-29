export type TRADE_STATUS = "ALL" | "OPEN" | "CLOSED" | "CANCELED";
export type TRADE = {
 _id: string;
 createdAt: Date;
 updatedAt: Date;
 buyPrice: number;
 sellPrice: number;
 quantity: number;
 symbol: string;
};

export type TICKER = {
 _id: string;
 symbol: string;
};

export type BINANCE_TICKER_STREAM = {
 s: string;
 c: string;
};

export type BINANC_ORDER = {
 symbol: string;
 orderId: string;
 price: string;
 origQty: string;
 side: "BUY" | "SELL";
};
