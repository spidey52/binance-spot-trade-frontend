import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, Switch, TextField } from "@mui/material";
import { useState } from "react";
import useModalHook from "../api/hooks/useModalHook";
import { useCreatePriceListenerHook } from "../api/services/usePriceListnerHook";
import SymbolFilter from "./SymbolFilter";

type PriceListnerBody = {
 symbol: string;
 price: number;
 event: string;
 expression: string;
 payload: {
  buyPercent: number;
  sellPercent: number;
  oomp: boolean;
 };
};
const initialState: PriceListnerBody = {
 symbol: "",
 price: 0,
 event: "TICKER_EDIT",
 expression: "",
 payload: {
  buyPercent: 0,
  sellPercent: 0,
  oomp: false,
 },
};

const CreatePriceListener = () => {
 const { open, handleOpen, handleClose } = useModalHook();

 const [state, setState] = useState<PriceListnerBody>(initialState);

 const { mutateAsync } = useCreatePriceListenerHook();

 const handleCreate = async () => {
  try {
   await mutateAsync(state);
   handleClose();
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <>
   <Button variant='contained' color='primary' onClick={handleOpen}>
    Add Listener
   </Button>
   <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Create Price Listener</DialogTitle>
    <DialogContent sx={{ minWidth: 400 }}>
     <Stack direction='column' spacing={2}>
      <Box></Box>
      <SymbolFilter
       width='100%'
       handleChange={(val: string) => {
        setState((prev) => ({ ...prev, symbol: val }));
       }}
      />

      <FormControl fullWidth size='small'>
       <InputLabel id='expression'>Expression</InputLabel>
       <Select
        label='expression'
        value={state.expression}
        onChange={(e) => {
         setState((prev) => ({ ...prev, expression: e.target.value as string }));
        }}
       >
        <MenuItem value='GTE'>GTE</MenuItem>
        <MenuItem value='LTE'>LTE</MenuItem>
       </Select>
      </FormControl>

      <TextField
       value={state.price}
       label='Trigger Price'
       type='number'
       onChange={(e) => {
        setState((prev) => ({ ...prev, price: +e.target.value }));
       }}
      />

      <TextField
       label='Buy Percent'
       value={state.payload.buyPercent}
       type='number'
       onChange={(e) => {
        setState((prev) => ({ ...prev, payload: { ...prev.payload, buyPercent: +e.target.value } }));
       }}
      />

      <TextField
       label='Sell Percent'
       value={state.payload.sellPercent}
       type='number'
       onChange={(e) => {
        setState((prev) => ({ ...prev, payload: { ...prev.payload, sellPercent: Number(e.target.value) } }));
       }}
      />

      <FormControlLabel
       label='OOMP'
       labelPlacement='start'
       sx={{
        justifyContent: "space-between",
       }}
       control={
        <Switch
         checked={state.payload.oomp}
         onChange={(e) => {
          setState((prev) => ({ ...prev, payload: { ...prev.payload, oomp: e.target.checked } }));
         }}
        />
       }
      />

      {/* <Switch checked={state.payload.buyPercent > 0}
             onChange={(e) => { }} /> */}

      <Button variant='contained' color='primary' onClick={handleCreate}>
       Create
      </Button>
     </Stack>
    </DialogContent>
   </Dialog>
  </>
 );
};

export default CreatePriceListener;
