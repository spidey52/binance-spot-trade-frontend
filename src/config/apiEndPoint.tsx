const DEV_URL = "http://localhost:9001";
const PROD_URL = localStorage.getItem("live-url") || "https://binance-spot-trade.spideyworld.co.in";

// import.meta.env.MODE === "development" ? DEV_URL : PROD_URL;
let BASE_URL = PROD_URL;

if (import.meta.env.MODE === "production") {
 BASE_URL = PROD_URL;
}
export { BASE_URL };

export const API_URL = {
 LOGIN: `${BASE_URL}/auth/login`,
 TRADE_LIST: `${BASE_URL}/trades`,
 GROUPED_PENDING_TRADES: `${BASE_URL}/trades/grouped/pending`,

 TICKER_LIST: `${BASE_URL}/tickers?future=true`,
 REPORT_PROFIT: `${BASE_URL}/reports`,
 PROFIT_CARD: `${BASE_URL}/reports/future/card`,
 PROFIT_BY_SYMBOL: `${BASE_URL}/reports/future/symbol`,

 //  orders
 ORDER_LIST: `${BASE_URL}/orders`,

 // price listenres
 PRICE_LISTENERS: `${BASE_URL}/price-listeners`,

 URL_LIST: [
  {
   url: "https://binance-spot-trade.spideyworld.co.in",
   title: "GCS",
  },
  {
   url: "https://satyam-algo-trade.spideyworld.co.in",
   title: "SAT",
  },
  {
   url: "http://localhost:9001",
   title: "DEV",
  },
 ],
};
