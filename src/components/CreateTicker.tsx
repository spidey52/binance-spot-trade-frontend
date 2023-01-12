import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { toast } from 'react-toastify'
import useModalHook from '../api/hooks/useModalHook'
import { useCreateTickerHook } from '../api/services/useTickerHook'
import { handleApiError } from '../error/handleApiError'

const CreateTicker = () => {
	const [ticker, setTicker] = React.useState('')
	const { open, handleOpen, handleClose } = useModalHook()
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTicker(e.target.value)

	const { mutateAsync, isLoading } = useCreateTickerHook()

	const handleCreate = async () => {
		try {
			await mutateAsync(ticker)
			handleClose()
			toast.success('Ticker created')
		} catch (error) {
			handleApiError(error)
		}
	}

	return (
		<Box>

			<Button color="inherit" onClick={handleOpen}> create ticker </Button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle> Create Ticker </DialogTitle>
				<Divider />

				<DialogContent>
					<TextField label="Ticker Name" value={ticker} onChange={handleChange} />
				</DialogContent>

				<Divider />

				<DialogActions>
					<Button onClick={handleClose} >Cancel</Button>
					<Button onClick={handleCreate} disabled={isLoading}> Create </Button>
				</DialogActions>


			</Dialog>

		</Box>
	)
}

export default CreateTicker