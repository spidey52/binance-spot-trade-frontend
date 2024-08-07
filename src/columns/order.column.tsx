import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const OrderColumns: GridColDef[] = [
 {
  field: "symbol",
  headerName: "Symbol",
  flex: 1,
 },
 {
  field: "orderId",
  headerName: "Order Id",
  flex: 1,
 },
 {
  field: "price",
  headerName: "Price",
  flex: 1,
 },
 {
  field: "origQty",
  headerName: "Quantity",
  flex: 1,
 },
 {
  field: "side",
  headerName: "Side",
  flex: 1,
  renderCell: ({ value }) => {
   // return <span style={{ color: "success.main" }}>{params.value}</span>;
   return (
    <Typography variant='subtitle1' color={value === "BUY" ? "green" : "red"}>
     {value}
    </Typography>
   );
  },
 },
];

export default OrderColumns;
