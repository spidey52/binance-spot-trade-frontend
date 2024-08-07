import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { API_URL } from "../../config/apiEndPoint";
import { TRADE_STATUS } from "../../types/trade";

type tradeParams = {
 status?: TRADE_STATUS;
 symbol?: string;
 date?: string;
 page?: number;
 limit?: number;
 market?: string;
 grouped?: boolean;
};

export const useTradeListHook = ({ status, symbol, date, page, limit, market, grouped }: tradeParams) => {
 const params: any = {};

 if (status && status !== "ALL") params.status = status;
 if (symbol) params.symbol = symbol;
 if (date) params.date = date;
 if (page) params.page = page;
 if (limit) params.limit = limit;
 if (limit) params.market = market;

 const fetchTrades = async () => {
  let url = API_URL.TRADE_LIST;
  return axios.get(url, { params });
 };

 return useQuery(["trades", symbol, status, date, page, limit, market], fetchTrades, {
  // initialData: { allTrades: [], totalProfit: 0 } as any,
  onError: (error) => {
   return { allTrades: [], totalProfit: 0, total: 0 } as any;
  },
  select: (data) => ({
   allTrades: data.data.allTrades,
   totalProfit: data.data.totalProfit,
   total: data.data.total || 0,
  }),
 });
};

export const useCreateTradeHook = () => {
 const createTrade = async (trade: any) => {
  return axios.post(API_URL.TRADE_LIST, trade);
 };

 const queryClient = useQueryClient();

 return useMutation(createTrade, {
  onSuccess: () => {
   queryClient.invalidateQueries(["trades"]);
  },
 });
};

export const useUpdateTradeHook = () => {
 const updateTrade = async (trade: any) => {
  return axios.patch(`${API_URL.TRADE_LIST}/${trade.id}`, trade);
 };

 const queryClient = useQueryClient();

 return useMutation(updateTrade, {
  onSuccess: () => {
   queryClient.invalidateQueries(["trades"]);
  },
 });
};

export const useDeleteTradeHook = () => {
 const deleteTrade = async (id: string) => {
  return axios.delete(`${API_URL.TRADE_LIST}/${id}`);
 };

 const queryClient = useQueryClient();

 return useMutation(deleteTrade, {
  onSuccess: () => {
   queryClient.invalidateQueries(["trades"]);
  },
 });
};
