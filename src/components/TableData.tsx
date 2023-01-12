import { LinearProgress } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useEffect } from 'react'


export interface TableDataProps {
	isLoading: boolean
	isRefetching: boolean
	data: any
	columns: GridColDef[],
	rows: any[],
	myheight?: string
}

const height = '80vh'

const TableData = ({ isLoading, isRefetching, data, columns, rows, myheight }: TableDataProps) => {

	return (
		<>
			<DataGrid
				loading={isLoading || isRefetching}
				rows={rows}
				columns={columns}
				pagination
				disableSelectionOnClick
				disableVirtualization
				sx={{
					height: myheight || height,
					maxHeight: "70vh",
				}}
			/>
		</>
	)
}

export default TableData