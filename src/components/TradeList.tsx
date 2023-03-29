import { Grid, Paper, Theme, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useMemo } from "react";
import { TRADE_STATUS } from "../types/trade";
import TradeTable from "./TradeTable";

const TradeList = () => {
 const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
 const tradeType: TRADE_STATUS[] = useMemo(() => {
  console.log("isMobile", isMobile);
  if (isMobile) {
   return ["OPEN", "CLOSED"];
  }
  return ["CLOSED", "OPEN"];
 }, [isMobile]);

 return (
  <Stack sx={{ p: 2, m: 2 }} component={Paper}>
   <Grid container spacing={2}>
    {tradeType.map((status: TRADE_STATUS) => (
     <Grid item sm={12} lg={6}>
      <TradeTable key={status} status={status} />
     </Grid>
    ))}
   </Grid>
  </Stack>
 );
};

export default TradeList;
