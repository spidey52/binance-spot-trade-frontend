import { GridCellParams } from "./../../node_modules/@mui/x-data-grid/models/params/gridCellParams.d";
import React from "react";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

export const TRADE_COLUMNS: GridColDef[] = [
 { field: "sno", headerName: "ID", width: 80 },

 // { field: 'status', headerName: 'Status', width: 130 },
 { field: "symbol", headerName: "Symbol", flex: 1, minWidth: 130 },
 { field: "quantity", headerName: "Quantity", flex: 1, minWidth: 110 },
 { field: "buyPrice", headerName: "Buy Price", flex: 1, minWidth: 130 },
 {
  field: "sellPrice",
  headerName: "Sell Price",
  flex: 1,
  minWidth: 130,
 },
 { field: "createdAt", headerName: "Created At", flex: 1, minWidth: 130 },
 { field: "updatedAt", headerName: "Updated At", flex: 1, minWidth: 130 },
 {
  field: "action",
  headerName: "Action",
  width: 150,
 },
];
