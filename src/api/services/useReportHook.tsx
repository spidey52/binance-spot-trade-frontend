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

export default useReportHook;
