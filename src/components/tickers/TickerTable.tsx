import { Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { toast } from "react-toastify";
import {
 useTickerListHook,
 useUpdateTickerHook,
} from "../../api/services/useTickerHook";
import TickerColumns from "../../columns/ticker.columns";
import TableData from "../TableData";

const TickerTable = () => {
 const { data, isLoading } = useTickerListHook();
 const { mutateAsync, isLoading: updateInProgress } = useUpdateTickerHook();

 const handleCellChange = async (params: any, event: any) => {
  const { row, field } = params;
  params.row[field] = event.target.value;
  const updatedValue = event.target.value;
  if (!updatedValue) {
   params.row[field] = row[field];
   return;
  }
  if (updatedValue === row[field]) return;

  try {
   await mutateAsync({ ...row, [field]: event.target.value });
   toast.success("Updated Successfully");
  } catch (error) {
   toast.error("Error Updating");
  }
 };

 return (
  <Box sx={{ m: 2, p: 2 }} component={Paper}>
   <TableData
    columns={TickerColumns}
    rows={getTickerRows(data)}
    isLoading={isLoading}
    isRefetching={updateInProgress}
    onCellEditStop={handleCellChange}
    autoHeight
   />
  </Box>
 );
};

function getTickerRows(tickers: any) {
 if (!tickers) return [];
 return tickers.map((ticker: any) => {
  return {
   ...ticker,
   id: ticker._id,
  };
 });
}

export default TickerTable;
