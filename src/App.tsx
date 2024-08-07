import { AppBar, Box, Button, CssBaseline, Menu, MenuItem, Stack, ThemeProvider, Toolbar, createTheme } from "@mui/material";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavLink, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import reactLogo from "./assets/react.svg";
import CreateTicker from "./components/CreateTicker";
import CreateTrade from "./components/CreateTrade";
import MyTicker from "./components/MyTicker";
import PriceListener from "./components/PriceListener";
import ProfitBySymbol from "./components/ProfitBySymbol";
import TradeList from "./components/TradeList";
import OrderTable from "./components/orders/OrderTable";
import { API_URL } from "./config/apiEndPoint";
import HomePage from "./pages/HomePage";

const theme = createTheme({
 palette: {
  mode: "light",
 },

 components: {
  MuiTextField: {
   defaultProps: {
    size: "small",
    fullWidth: true,
   },
  },
  MuiFormControl: {
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
const links = [
 {
  label: "Home",
  to: "/",
  component: <HomePage />,
 },

 {
  label: "Profit By Symbol",
  to: "/profit-by-symbol",
  component: <ProfitBySymbol />,
 },
 {
  label: "Price Listeners",
  to: "/price-listeners",
  component: <PriceListener />,
 },
 {
  label: "Trades",
  to: "/trades",
  component: <TradeList />,
 },
 {
  label: "Orders",
  to: "/orders",
  component: <OrderTable />,
 },
];

const router = createBrowserRouter([
 {
  path: "/",
  element: <Layout />,
  errorElement: <div>error</div>,
  children: links.map((link) => ({
   path: link.to,
   element: link.component,
  })),
 },
]);
function Layout() {
 return (
  <Box>
   <Stack direction='row' spacing={2}>
    {links.map((link) => {
     return (
      <Button
       key={link.to}
       color='inherit'
       component={NavLink}
       to={link.to}
       variant='text'
       sx={{
        "&.active": {
         color: "primary.main",
        },
       }}
      >
       {link.label}
      </Button>
     );
    })}
   </Stack>
   <Box
    sx={{
     width: "100%",
     margin: "auto",
     p: 2,
    }}
   >
    <Outlet />
   </Box>
  </Box>
 );
}

function App() {
 return (
  <ThemeProvider theme={theme}>
   <QueryClientProvider client={queryClient}>
    <Box>
     <CssBaseline />
     <AppBar position='fixed'>
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

         <UrlSelector />
        </Stack>
       </Box>
      </Toolbar>
     </AppBar>
     <Toolbar />
     <RouterProvider router={router} />

     <MyTicker />
    </Box>
   </QueryClientProvider>
  </ThemeProvider>
 );
}

const UrlSelector = () => {
 const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
 return (
  <>
   <Button
    id='basic-button'
    sx={{ color: "white" }}
    aria-controls={anchorEl ? "basic-menu" : undefined}
    aria-haspopup='true'
    aria-expanded={anchorEl ? "true" : undefined}
    onClick={(event) => {
     setAnchorEl(event.currentTarget);
    }}
   >
    select server
   </Button>
   <Menu
    sx={{ minWidth: 200 }}
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={() => {
     setAnchorEl(null);
    }}
   >
    {API_URL.URL_LIST.map((url) => {
     return (
      <MenuItem
       onClick={() => {
        localStorage.setItem("live-url", url.url);
        window.location.reload();
       }}
      >
       {url.title}
      </MenuItem>
     );
    })}
   </Menu>
  </>
 );
};

export default App;
