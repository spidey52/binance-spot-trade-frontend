import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../../config/apiEndPoint";

const useReportHook = () => {
 const fetchReport = async () => {
  return axios.get(API_URL.REPORT_PROFIT);
 };

 return useQuery(["report"], fetchReport, {
  select: (data) => data.data,
 });
};

export default useReportHook;
