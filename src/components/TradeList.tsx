import { Paper } from "@mui/material";
import { Stack } from "@mui/system";
import TradeTable from "./TradeTable";

const TradeList = () => {
 return (
  <Stack sx={{ p: 2, m: 2 }} component={Paper}>
   <TradeTable status='OPEN' />
  </Stack>
 );
};

export default TradeList;
