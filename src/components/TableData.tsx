import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";

export interface TableDataProps extends DataGridProps {
 isLoading: boolean;
 isRefetching: boolean;
 data?: any;
 columns: GridColDef[];
 rows: any[];
 myheight?: string;
 paginationMode?: "server" | "client";
}

const height = "80vh";

const TableData = ({ isLoading, isRefetching, data, columns, rows, myheight, ...rest }: TableDataProps) => {
 return (
  <>
   <DataGrid
    loading={isLoading || isRefetching}
    rows={rows}
    columns={columns}
    pagination
    paginationMode={rest.paginationMode || "server"}
    disableSelectionOnClick
    disableVirtualization
    sx={{
     height: myheight || height,
     maxHeight: "70vh",
    }}
    {...rest}
   />
  </>
 );
};

export default TableData;
