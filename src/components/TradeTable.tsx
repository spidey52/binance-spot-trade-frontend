import { Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import moment from "moment";
import React from "react";
import { useTradeListHook } from "../api/services/userTradeHook";
// import { TRADE_COLUMNS } from '../columns/trade.columns'
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import usePaginationHook from "../api/hooks/usePaginationHook";
import { setModel } from "../redux/slices/ticker.slice";
import { RootState } from "../redux/store";
import { TRADE, TRADE_STATUS } from "../types/trade";
import SymbolFilter from "./SymbolFilter";
import TableData from "./TableData";

const dates = [
 { label: "Today", value: moment().startOf("day").format("YYYY-MM-DD") },
 {
  label: "Yesterday",
  value: moment().subtract(1, "days").startOf("day").format("YYYY-MM-DD"),
 },
 {
  label: "Last 7 days",
  value: moment().subtract(7, "days").startOf("day").format("YYYY-MM-DD"),
 },
 {
  label: "Last 30 days",
  value: moment().subtract(30, "days").startOf("day").format("YYYY-MM-DD"),
 },
 {
  label: "Last 90 days",
  value: moment().subtract(90, "days").startOf("day").format("YYYY-MM-DD"),
 },
 {
  label: "All time",
  value: moment().subtract(10, "years").startOf("day").format("YYYY-MM-DD"),
 },
];

const TradeTable = ({ status }: { status: TRADE_STATUS }) => {
 const { limit, page, setLimit, setPage } = usePaginationHook({ limit: 100, page: 0 });
 const [symbol, setSymbol] = React.useState("");

 const { tickers, model } = useSelector((state: RootState) => state.tickers);
 const dispatch = useDispatch();

 const [date, setDate] = React.useState(moment().subtract(10, "years").startOf("day").format("YYYY-MM-DD"));
 const { data, isLoading, isRefetching } = useTradeListHook({
  status,
  symbol,
  date,
  limit,
  page,
  market: model,
 });

 const handleSymbolChange = (symbol: string) => {
  setSymbol(symbol);
 };

 const getTickerProfit = (symbol: string, buyPrice: number, quantity: number) => {
  const profit = ((tickers[symbol] - buyPrice) * quantity).toFixed(2);
  if (!profit) return { profit: 0, percentage: 0 };
  const percentage = (((tickers[symbol] - buyPrice) / buyPrice) * 100).toFixed(2);
  return { profit, percentage };
 };

 const TRADE_COLUMNS = React.useMemo(() => {
  const columns: GridColDef[] = [
   { field: "symbol", headerName: "Symbol", flex: 1, minWidth: 100 },
   { field: "quantity", headerName: "Quantity", flex: 1, minWidth: 100 },
   { field: "buyPrice", headerName: "Buy Price", flex: 1, minWidth: 100 },
   {
    field: "currentPrice",
    headerName: "Current Price",
    flex: 1,
    minWidth: 100,
    hide: status === "CLOSED",

    renderCell: ({ value }) => {
     return (
      <Stack direction='row' spacing={1}>
       <Typography>{value}</Typography>
      </Stack>
     );
    },
   },
   {
    field: "sellPrice",
    headerName: "Sell Price",
    flex: 1,
    minWidth: 100,
    hide: status === "OPEN",
   },
   {
    field: "profit",
    headerName: "profit",
    width: 150,
    hide: status === "CLOSED",
    sortComparator: (v1, v2, param1, param2) => {
     return Number(v1.profit) - Number(v2.profit);
    },
    renderCell: ({ value }) => {
     return (
      <Stack direction='row' spacing={1}>
       <Typography>{value.profit}</Typography>
       <Typography sx={{ color: Number(value.percentage) > 0 ? "green" : "red" }}>({value.percentage}%)</Typography>
      </Stack>
     );
    },
   },
   { field: "createdAt", headerName: "Created At", flex: 1, minWidth: 100 },
   {
    field: "updatedAt",
    headerName: "Updated At",
    flex: 1,
    minWidth: 120,
    hide: status === "OPEN",
   },
  ];
  return columns;
 }, [status]);
 const handleModelChange = (e: SelectChangeEvent) => {
  if (e.target.value === "SPOT") dispatch(setModel("SPOT"));
  else dispatch(setModel("FUTURE"));
 };

 return (
  <Box sx={{ width: "100%" }}>
   <Stack sx={{ py: 1, justifyContent: "space-between", alignItems: "center" }}>
    <Stack direction='row' spacing={2} alignItems='center'>
     <Select sx={{ width: 200 }} size='small' value={date} onChange={(e) => setDate(e.target.value)}>
      {dates.map((date) => {
       return (
        <MenuItem key={date.label} value={date.value}>
         {date.label}
        </MenuItem>
       );
      })}
     </Select>
     {status === "CLOSED" && (
      <Typography variant='h6' sx={{ fontWeight: "bold" }}>
       Total Profit {parseFloat(data?.totalProfit[0]?.sum || "0").toFixed(2)}
      </Typography>
     )}
    </Stack>

    <SymbolFilter handleChange={handleSymbolChange} />
   </Stack>

   <TableData
    isLoading={isLoading}
    isRefetching={isRefetching}
    data={data}
    columns={TRADE_COLUMNS}
    rows={
     data?.allTrades.map((trade: TRADE, index: number) => {
      return {
       ...trade,
       id: trade._id,
       sno: index + 1,
       currentPrice: tickers[trade.symbol],
       profit: status === "CLOSED" ? "" : getTickerProfit(trade.symbol, trade.buyPrice, trade.quantity),
       createdAt: moment(trade.createdAt).format("DD-MM-YYYY HH:mm"),
       updatedAt: moment(trade.updatedAt).format("DD-MM-YYYY HH:mm"),
      };
     }) || []
    }
    myheight='80vh'
    page={page}
    pageSize={limit}
    rowCount={data?.total || 0}
    rowsPerPageOptions={[10, 20, 50, 100]}
    onPageSizeChange={(pageSize) => setLimit(pageSize)}
    onPageChange={(page) => {
     setPage(page);
    }}
   />
  </Box>
 );
};

export default TradeTable;
