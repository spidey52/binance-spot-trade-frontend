import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
 AppBar,
 Box,
 createTheme,
 CssBaseline,
 Grid,
 Paper,
 Stack,
 ThemeProvider,
 Toolbar,
} from "@mui/material";
import TradeList from "./components/TradeList";
import { QueryClient, QueryClientProvider } from "react-query";
import CreateTrade from "./components/CreateTrade";
import CreateTicker from "./components/CreateTicker";
import MyTicker from "./components/MyTicker";
import ProfitChart from "./components/ProfitChart";
import TickerTable from "./components/tickers/TickerTable";
import OrderTable from "./components/orders/OrderTable";

const theme = createTheme({
 palette: {
  mode: "dark",
 },

 components: {
  MuiTextField: {
   defaultProps: {
    size: "small",
    fullWidth: true,
   },
  },
  MuiButton: {
   defaultProps: {
    size: "small",
   },
  },
  MuiStack: {
   defaultProps: {
    spacing: 2,
    direction: "row",
   },
  },
 },
});

const queryClient = new QueryClient();
queryClient.setDefaultOptions({
 queries: {
  refetchOnWindowFocus: true,
  refetchOnMount: true,
 },
});

function App() {
 return (
  <ThemeProvider theme={theme}>
   <QueryClientProvider client={queryClient}>
    <Box>
     <CssBaseline />
     <AppBar position='static'>
      <Toolbar>
       <Box
        sx={{
         width: "100%",
         display: "flex",
         justifyContent: "space-between",
         alignItems: "center",
        }}
       >
        <img src={reactLogo} className='App-logo' alt='logo' />
        <Stack direction='row' sx={{ alignItems: "center" }}></Stack>
        <Stack>
         <CreateTrade />
         <CreateTicker />
        </Stack>
       </Box>
      </Toolbar>
     </AppBar>

     <MyTicker />
     <TradeList />

     <Box sx={{ m: 2, p: 2 }} component={Paper}>
      <Grid container spacing={2}>
       <Grid item xs={12} lg={6}>
        <TickerTable />
       </Grid>
       <Grid item xs={12} lg={6}>
        <OrderTable />
       </Grid>
      </Grid>
     </Box>
     <ProfitChart />
    </Box>
   </QueryClientProvider>
  </ThemeProvider>
 );
}

export default App;
