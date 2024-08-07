import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { API_URL } from "../../config/apiEndPoint";

type PriceListenerData = {
 _id: string;
 symbol: string;
 price: number;
 expression: "GTE" | "LTE";
 event: "TICKER_EDIT";
 active: boolean;
 payload: {
  [key: string]: any;
 };
 createdAt: Date;
 updatedAt: Date;
};

const usePriceListnerListHook = () => {
 const fetchPriceListnerList = async () => {
  return axios.get(API_URL.PRICE_LISTENERS, {});
 };

 return useQuery(["priceListnerList"], fetchPriceListnerList, {
  select: (res) => res.data.data as PriceListenerData[],
 });
};

const useCreatePriceListenerHook = () => {
 const createPriceListener = async (priceListener: any) => {
  return axios.post(API_URL.PRICE_LISTENERS, priceListener);
 };

 const queryClient = useQueryClient();

 return useMutation(createPriceListener, {
  onSuccess: () => {
   queryClient.invalidateQueries(["priceListnerList"]);
  },
 });
};

export { useCreatePriceListenerHook, usePriceListnerListHook };
