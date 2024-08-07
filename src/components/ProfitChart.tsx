import { Paper, Switch, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BarElement, CategoryScale, Chart as ChartJS, ChartOptions, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useBoolean } from "react-use";
import { useReportHook } from "../api/services/useReportHook";
import { RootState } from "../redux/store";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options: ChartOptions<"bar"> = {
 datasets: {},
};

const ProfitChart = () => {
 const { model } = useSelector((state: RootState) => state.tickers);
 const { data, isLoading } = useReportHook({
  future: model === "FUTURE",
 });
 const [showTotalProfit, setShowTotalProfit] = useBoolean(false);

 const chartData = useMemo(() => {
  if (!data) return { labels: [], datasets: [] };
  const labels = data.map((item: any) => item._id.updatedAt);
  const values = data.map((item: any) => item.profit);
  const avgProfit = data.map((item: any) => item.avgProfit);
  const totalProfit = data.map((item: any) => item.totalProfit);
  const options = {
   labels,
   datasets: [
    {
     label: "Profit",
     data: values,
     backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
    {
     label: "Avg Profit",
     data: avgProfit,
     backgroundColor: "rgba(54, 162, 235, 0.2)",
    },
   ],
  };

  if (showTotalProfit) {
   options.datasets.push({
    label: "Total Profit",
    data: totalProfit,
    backgroundColor: "rgba(75, 192, 192, 0.2)",
   });
  }

  return options;
 }, [data, showTotalProfit]);

 return (
  <Box sx={{ m: 2, p: 2 }} component={Paper}>
   <Box sx={{ display: "flex", justifyContent: "center" }}>
    <Typography variant='h6' sx={{ textAlign: "center" }}>
     PROFIT CHART
    </Typography>
    <Switch checked={showTotalProfit} onChange={setShowTotalProfit} sx={{ ml: 2 }} />
   </Box>

   <Bar data={chartData} />
  </Box>
 );
};

export default ProfitChart;
