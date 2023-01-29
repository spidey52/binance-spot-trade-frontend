import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
 AppBar,
 Box,
 createTheme,
 CssBaseline,
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
 const [count, setCount] = useState(0);

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
     <TickerTable />
     <ProfitChart />
    </Box>
   </QueryClientProvider>
  </ThemeProvider>
 );
}

export default App;
