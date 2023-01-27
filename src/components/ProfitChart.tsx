import React, { useMemo } from "react";
import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useReportHook from "../api/services/useReportHook";
import { Box } from "@mui/system";
import { Paper, Typography } from "@mui/material";

ChartJS.register(
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
);
const ProfitChart = () => {
 const { data, isLoading } = useReportHook();

 const chartData = useMemo(() => {
  if (!data) return { labels: [], datasets: [] };
  const labels = data.map((item: any) => item._id.updatedAt);
  const values = data.map((item: any) => item.profit);
  return {
   labels,
   datasets: [
    {
     label: "Profit",
     data: values,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
   ],
  };
 }, [data]);

 return (
  <Box sx={{ m: 2, p: 2 }} component={Paper}>
   <Typography variant='h6' sx={{ textAlign: "center" }}>
    PROFIT CHART
   </Typography>

   <Bar data={chartData} />
  </Box>
 );
};

export default ProfitChart;
