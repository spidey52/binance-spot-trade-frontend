import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../../config/apiEndPoint";
import { BINANC_ORDER } from "../../types/trade";

type ListOrderParams = {
 symbol: string;
 side: string;
};

const useListOrderHook = ({ symbol, side }: ListOrderParams) => {
 const params: any = {};
 if (symbol) {
  params.symbol = symbol;
 }
 if (side !== "all") {
  params.side = side;
 }
 const fetchOrders = async () => {
  return axios.get(API_URL.ORDER_LIST, {
   params,
  });
 };

 return useQuery(["orders", side, symbol], fetchOrders, {
  select: (data) => data.data as BINANC_ORDER[],
 });
};

export default useListOrderHook;
