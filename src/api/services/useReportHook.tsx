import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../../config/apiEndPoint";

type Report = {
 future: boolean;
};

const useReportHook = ({ future }: Report) => {
 const query: any = {};

 if (future) {
  query.future = future;
 }

 const fetchReport = async () => {
  return axios.get(API_URL.REPORT_PROFIT, {
   params: query,
  });
 };

 return useQuery(["report", future], fetchReport, {
  select: (data) => data.data,
 });
};

type ProfitBySymbolData = {
 _id: string;
 profit: number;
};
const useProfitBySymbolHook = () => {
 const fetchProfitBySymbol = async () => {
  return axios.get(API_URL.PROFIT_BY_SYMBOL);
 };

 return useQuery("profitBySymbol", fetchProfitBySymbol, {
  select: (data) => data.data as ProfitBySymbolData[],
 });
};

type ProfitCardData = { title: string; profit: number };

const useProfitCardHook = () => {
 const fetchProfits = async () => {
  try {
   //  const res = await axios.get(API_URL.PROFIT_CARD);
   return axios.get(API_URL.PROFIT_CARD);
   //  return res.data.result;
  } catch (error) {
   console.log(error);
  }
 };

 return useQuery(["profit card"], fetchProfits, {
  select: (res) => res?.data.result as ProfitCardData[],
  refetchInterval: 1000 * 10,
 });
};

export { useProfitBySymbolHook, useProfitCardHook, useReportHook };
