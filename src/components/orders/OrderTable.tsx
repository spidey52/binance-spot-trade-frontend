import { Box, Menu, MenuItem, Paper, Select, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import useListOrderHook from "../../api/services/useOrderHook";
import OrderColumns from "../../columns/order.column";
import SymbolFilter from "../SymbolFilter";
import TableData from "../TableData";

const OrderTable = () => {
 const [side, setSide] = useState<string>("all");
 const [symbol, setSymbol] = useState<string>("");
 const { data, isLoading, isRefetching } = useListOrderHook({ side, symbol });

 return (
  <Box component={Paper}>
   {/* <Typography> OrderTable </Typography> */}
   <Stack sx={{ justifyContent: "space-between", mb: 2 }}>
    <Box>
     <Select
      value={side}
      onChange={(e) => setSide(e.target.value)}
      size='small'
      sx={{ minWidth: 200 }}
     >
      <MenuItem value='all'>All</MenuItem>
      <MenuItem value='BUY'>Buy</MenuItem>
      <MenuItem value='SELL'>Sell</MenuItem>
     </Select>
    </Box>
    <SymbolFilter handleChange={setSymbol} />
   </Stack>

   <TableData
    columns={OrderColumns}
    rows={getOrderRows(data)}
    isLoading={isLoading}
    isRefetching={isRefetching}
   />
  </Box>
 );
};

function getOrderRows(orders: any) {
 if (!orders) return [];
 return orders.map((order: any) => {
  return {
   ...order,
   id: order.orderId,
   price: parseFloat(order.price),
   origQty: parseFloat(order.origQty),
  };
 });
}

export default OrderTable;
