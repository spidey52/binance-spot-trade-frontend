import { Switch } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { useUpdateTickerHook } from "../api/services/useTickerHook";
import { handleApiError } from "../error/handleApiError";
const TickerColumns: GridColDef[] = [
 {
  field: "symbol",
  headerName: "Symbol",
  editable: true,
  flex: 1,
 },
 {
  field: "buyPercent",
  headerName: "Buy %",
  editable: true,
  flex: 1,
 },
 {
  field: "sellPercent",
  headerName: "Sell %",
  editable: true,
  flex: 1,
 },
 {
  field: "precision",
  headerName: "Precision",
  editable: true,
  flex: 1,
 },
 {
  field: "loopEnabled",
  headerName: "Loop Enabled",
  renderCell: (params: any) => <RenderLoopEnabled params={params} />,
  flex: 1,
 },
];

const RenderLoopEnabled = ({ params }: { params: any }) => {
 const value = params.value;

 const { mutateAsync, isLoading } = useUpdateTickerHook();
 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  try {
   mutateAsync({ ...params.row, loopEnabled: event.target.checked });
   toast.success("Updated Successfully");
  } catch (error) {
   handleApiError(error);
  }
 };

 return <Switch checked={value} disabled={isLoading} onChange={handleChange} />;
};

export default TickerColumns;
