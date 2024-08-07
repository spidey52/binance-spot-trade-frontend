import { Box, Card, CardHeader, Stack } from "@mui/material";
import { useProfitCardHook } from "../api/services/useReportHook";
import TradeList from "../components/TradeList";

const HomePage = () => {
 return (
  <Box sx={{}}>
   <ProfitCard />
   <TradeList />
  </Box>
 );
};

type ProfitCardData = { title: string; profit: number };

const ProfitCard = () => {
 const { data: state } = useProfitCardHook();

 return (
  <Stack direction='row' spacing={2} sx={{ overflow: "auto", p: 2 }}>
   {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}

   {state?.map((item) => (
    <Card sx={{ minWidth: "200px", width: "100%" }}>
     <CardHeader
      title={item.title.toUpperCase()}
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
  </Stack>
 );
};

export default HomePage;
