import { Box, Paper, Stack, Toolbar } from "@mui/material";
import { useMemo } from "react";
import { usePriceListnerListHook } from "../api/services/usePriceListnerHook";
import CreatePriceListener from "./CreatePriceListener";
import RefreshIconButton from "./helpers/RefreshIconButton";

type Props = {};

const PriceListener = (props: Props) => {
 const { data, refetch } = usePriceListnerListHook();

 const listeners = useMemo(() => data || [], [data]);

 return (
  <Box p={2}>
   <Toolbar sx={{ border: "1px solid #ccc" }} component={Paper} elevation={0}>
    <Stack spacing={2} sx={{ width: "100%", alignItems: "center", justifyContent: "space-between" }}>
     <RefreshIconButton isLoading={false} onClick={() => refetch()} />
     <CreatePriceListener />
    </Stack>
   </Toolbar>

   <Stack direction='column' spacing={2}>
    {listeners.map((el) => {
     return (
      <Box key={el._id} sx={{ width: 400 }}>
       {/* <Box>{el.symbol}</Box>
       <Box>{el.price}</Box>
       <Box>{el.expression}</Box>
       <Box>{el.event}</Box>

       <Box>{el.active ? "active" : "inactive"}</Box> */}

       {/* <Box>{el.payload?.side}</Box> */}

       <pre>{JSON.stringify(el, null, 2)}</pre>

       {/* <Box>{el.symbol}</Box>
       <Box>{el.price}</Box>
       <Box>{el.expression}</Box>
       <Box>{el.event}</Box>
       <Box>{el.active ? "active" : "inactive"}</Box>

       {Object.keys(el.payload).map((key) => {
        return (
         <Box key={key}>
          {key}: {el.payload[key].toString()}
         </Box>
        );
       })} */}
      </Box>
     );
    })}
    <Box></Box>
   </Stack>
  </Box>
 );
};

export default PriceListener;
