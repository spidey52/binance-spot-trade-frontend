import { Box, Card, CardHeader } from "@mui/material";
import { useMemo } from "react";
import { useProfitBySymbolHook } from "../api/services/useReportHook";
import RefreshIconButton from "./helpers/RefreshIconButton";

type Props = {};

const ProfitBySymbol = (props: Props) => {
 const { data: state, isLoading, isRefetching, refetch } = useProfitBySymbolHook();

 const sorted = useMemo(() => {
  if (!state) return [];
  return state.sort((a, b) => b.profit - a.profit);
 }, [state]);

 return (
  <div>
   <>
    {/* <IconButton onClick={() => refetch()}>{isLoading || isRefetching ? <Pending /> : <Refresh />}</IconButton> */}

    <RefreshIconButton isLoading={isLoading || isRefetching} onClick={() => refetch()} />

    <Box
     sx={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "1rem",
     }}
    >
     {sorted?.map((item) => (
      <Card sx={{}}>
       <CardHeader
        title={item._id.toUpperCase()}
        titleTypographyProps={{
         variant: "body1",
         fontWeight: "600",
        }}
        subheaderTypographyProps={{
         color: item.profit > 0 ? "success.main" : "error.main",
         fontWeight: "bold",
         fontSize: "1.25rem",
         pt: "0.5rem",
        }}
        subheader={`$ ${item.profit.toFixed(2)}`}
        color='primary'
        p={2}
       />
      </Card>
     ))}
    </Box>
   </>
  </div>
 );
};

export default ProfitBySymbol;
