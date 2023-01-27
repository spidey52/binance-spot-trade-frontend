import { Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import { TRADE_STATUS } from "../types/trade";
import TradeTable from "./TradeTable";

const tradeType: TRADE_STATUS[] = ["CLOSED", "OPEN"];
const TradeList = () => {
 return (
  <Stack sx={{ p: 2, m: 2 }} component={Paper}>
   {tradeType.map((status: TRADE_STATUS) => (
    <TradeTable key={status} status={status} />
   ))}
  </Stack>
 );
};

export default TradeList;
