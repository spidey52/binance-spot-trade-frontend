import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, MenuItem, Select, TextField, Typography } from '@mui/material'
import moment from 'moment'
import { Stack } from '@mui/system'
import React from 'react'
import { useDeleteTradeHook, useTradeListHook, useUpdateTradeHook } from '../api/services/userTradeHook'
// import { TRADE_COLUMNS } from '../columns/trade.columns'
import { TRADE, TRADE_STATUS } from '../types/trade'
import SymbolFilter from './SymbolFilter'
import TableData from './TableData'
import { GridColDef } from '@mui/x-data-grid'
import useModalHook from '../api/hooks/useModalHook'
import { toast } from 'react-toastify'
import { handleApiError } from '../error/handleApiError'
import { calculateTotalProfit } from '../utils/calc'


const Actions = ({ trade }: { trade: TRADE }) => {
	return (
		<Stack spacing={1} alignItems="center">
			<DeleteTrade trade={trade} />
			<SellTrade trade={trade} />
		</Stack>
	)
}

const SellTrade = ({ trade }: { trade: TRADE }) => {
	const { open, handleOpen, handleClose } = useModalHook()
	const [price, setPrice] = React.useState('')
	const { mutateAsync, isLoading } = useUpdateTradeHook()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setPrice((e.target.value))

	const handleSell = async () => {
		try {
			await mutateAsync({ sellPrice: price, id: trade._id })
			toast.success('Trade sold')
			handleClose()
		} catch (error) {
			handleApiError(error)
		}
	}

	return (
		<>
			<Button variant="contained" color="success" onClick={handleOpen}>Sell</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle> Sell Trade </DialogTitle>
				<DialogContent>

					<Box sx={{ pt: 1 }}>
						<TextField label="Sell Price" value={price} onChange={handleChange} />
					</Box>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button color='success' onClick={handleSell} disabled={isLoading}>Sell</Button>
				</DialogActions>

			</Dialog>
		</>)
}

const DeleteTrade = ({ trade }: { trade: TRADE }) => {
	const { open, handleOpen, handleClose } = useModalHook()
	const { mutateAsync, isLoading } = useDeleteTradeHook()

	const handleDelete = async () => {
		try {
			await mutateAsync(trade._id)
			toast.success('Trade deleted')
			handleClose()
		} catch (error) {
			handleApiError(error)
		}
	}
	return (
		<>
			<Button variant="contained" color="error" onClick={handleOpen}>Delete</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle> Delete Title  </DialogTitle>
				<DialogContent>
					<Typography>Are you sure you want to delete this trade?</Typography>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button color='error' onClick={handleDelete} disabled={isLoading}>Delete</Button>
				</DialogActions>


			</Dialog>
		</>
	)
}




const TradeTable = ({ status }: { status: TRADE_STATUS }) => {
	const { data, isLoading, isRefetching } = useTradeListHook({ status })
	const [date, setDate] = React.useState('today' as string)

	const handleSymbolChange = (symbol: string) => {

		console.log(symbol)
	}


	const TRADE_COLUMNS = React.useMemo(() => {
		const columns: GridColDef[] = [
			{ field: 'symbol', headerName: 'Symbol', flex: 1, minWidth: 100 },
			{ field: 'quantity', headerName: 'Quantity', flex: 1, minWidth: 100 },
			{ field: 'buyPrice', headerName: 'Buy Price', flex: 1, minWidth: 100 },
			{
				field: 'sellPrice', headerName: 'Sell Price', flex: 1, minWidth: 100,
			},
			{ field: 'createdAt', headerName: 'Created At', flex: 1, minWidth: 100 },
			{ field: 'updatedAt', headerName: 'Updated At', flex: 1, minWidth: 100 },
			{
				field: 'action', headerName: 'Action', flex: 1, minWidth: 180, renderCell: (params) => <Actions trade={params.row as TRADE} />
			}
		]

		if (status === 'OPEN') columns.splice(3, 1)
		if (status === 'CLOSED') columns.splice(-1, 1)

		return columns

	},
		[status])




	return (
		<Box sx={{ width: "100%" }}>

			<Stack sx={{ py: 1, justifyContent: 'space-between', alignItems: 'center' }} >


				<Stack direction="row" spacing={2} alignItems="center">
					<Select sx={{ width: 200 }} size="small" value={date} onChange={e => setDate(e.target.value)}>
						<MenuItem value="today">today</MenuItem>
						<MenuItem value="yesterday">yesterday</MenuItem>
						<MenuItem value="last 7 days">last 7 days</MenuItem>
						<MenuItem value="last 30 days">last 30 days</MenuItem>
						<MenuItem value="last 90 days">last 90 days</MenuItem>
						<MenuItem value="last 180 days">last 180 days</MenuItem>
					</Select>

					{
					status=== 'CLOSED' &&	<Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Profit {calculateTotalProfit(data || []).toFixed(2)}</Typography>
					}
				</Stack>


				<SymbolFilter handleChange={handleSymbolChange} />
			</Stack>

			<TableData
				isLoading={isLoading}
				isRefetching={isRefetching}
				data={data}
				columns={TRADE_COLUMNS}
				rows={
					data?.map((trade: TRADE, index: number) => {
						return {
							...trade,
							id: trade._id,
							sno: index + 1,
							createdAt: moment(trade.createdAt).format('DD-MM-YYYY HH:mm'),
							updatedAt: moment(trade.updatedAt).format('DD-MM-YYYY HH:mm'),
						}
					}) || []
				}
				myheight="80vh"
			/>

		</Box>
	)
}

export default TradeTable;