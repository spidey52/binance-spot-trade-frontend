import { Autocomplete, AutocompleteProps, TextField, TextFieldProps } from '@mui/material'
import React from 'react'
import { useTickerListHook } from '../api/services/useTickerHook'
import { TICKER } from '../types/trade'
import CreateTicker from './CreateTicker'

const SymbolFilter = ({ width, handleChange }: { width?: any, handleChange: any }) => {

	const { data, isLoading, error } = useTickerListHook()

	return (
		<Autocomplete
			id="combo-box-demo"
			loading={isLoading}
			options={data?.map((el: TICKER) => el.symbol) || []}
			onChange={(e, value) => handleChange(value || '')}
			sx={{ width: width || 200 }}
			renderInput={(params) => <TextField  {...params} label="select pair" />}
		/>
	)
}

export default SymbolFilter