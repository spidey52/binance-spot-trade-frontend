import { Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "react-toastify";
import {
 useTickerListHook,
 useUpdateTickerHook,
} from "../../api/services/useTickerHook";
import TickerColumns from "../../columns/ticker.columns";
import SymbolFilter from "../SymbolFilter";
import TableData from "../TableData";

const TickerTable = () => {
 const [symbol, setSymbol] = useState<string>("");
 const { data, isLoading } = useTickerListHook();
 const { mutateAsync, isLoading: updateInProgress } = useUpdateTickerHook();

 const handleCellChange = async (params: any, event: any) => {
  const { row, field } = params;
  const updatedValue = event.target.value;
  if (!updatedValue) {
   params.row[field] = row[field];
   console.log("No value");
   return;
  }
  if (updatedValue === row[field]) return;
  params.row[field] = event.target.value;

  try {
   await mutateAsync({ ...row, [field]: event.target.value });
   toast.success("Updated Successfully");
  } catch (error) {
   toast.error("Error Updating");
  }
 };

 return (
  <Box>
   <Box sx={{ mb: 2 }}>
    <SymbolFilter handleChange={setSymbol} />
   </Box>

   <TableData
    columns={TickerColumns}
    rows={getTickerRows(data)}
    isLoading={isLoading}
    isRefetching={updateInProgress}
    onCellEditStop={handleCellChange}
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
