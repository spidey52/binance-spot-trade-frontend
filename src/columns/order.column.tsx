import { GridColDef } from "@mui/x-data-grid";
import React from "react";

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
 },
];

export default OrderColumns;
