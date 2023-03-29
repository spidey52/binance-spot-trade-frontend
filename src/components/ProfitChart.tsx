import React, { useMemo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, DatasetChartOptions, DatasetController, ChartDataset, ChartOptions, ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import useReportHook from "../api/services/useReportHook";
import { Box } from "@mui/system";
import { Button, Paper, Switch, ToggleButton, Typography } from "@mui/material";
import { useBoolean } from "react-use";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options: ChartOptions<"bar"> = {
 datasets: {},
};

const ProfitChart = () => {
 const { data, isLoading } = useReportHook();
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
