import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@mui/material'
import { useState } from 'react'
import useModalHook from '../api/hooks/useModalHook'
import { useCreateTradeHook } from '../api/services/userTradeHook'
import { handleApiError } from '../error/handleApiError'
import SymbolFilter from './SymbolFilter'

const CreateTrade = () => {
	const { open, handleOpen, handleClose } = useModalHook()
	const [trade, setTrade] = useState({
		symbol: '',
		quantity: '',
		buyPrice: '',
	})

	const { mutateAsync, isLoading } = useCreateTradeHook()


	const handleCreate = async () => {
		try {
			await mutateAsync(trade)
			handleClose()
		} catch (error) {
			handleApiError(error);
		}

	}

	const handleSymbolChange = (symbol: string) => {
		setTrade({ ...trade, symbol })
	}

	return (
		<Box>

			<Button sx={{ color: "inherit" }} onClick={handleOpen}>Create Trade</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create Trade</DialogTitle>
				<Divider />
				<DialogContent>
					<Box sx={{ display: "grid", gridTemplateColumns: "1fr", rowGap: 2, minWidth: 400 }}>
						<TextField label="Buy Price" type="number" value={trade.buyPrice} onChange={e => setTrade({ ...trade, buyPrice: e.target.value })} />
						<TextField label="Quantity" type="number" value={trade.quantity} onChange={e => setTrade({ ...trade, quantity: e.target.value })} />
						<SymbolFilter handleChange={handleSymbolChange} width="100%" />
					</Box>
				</DialogContent>

				<Divider />
				<DialogActions sx={{}}>
					<Button color="error" onClick={handleClose}>Cancel</Button>
					<Button color="primary" onClick={handleCreate}>Create</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

export default CreateTrade