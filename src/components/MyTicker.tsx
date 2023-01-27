import { colors, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTickerListHook } from '../api/services/useTickerHook'
import { setGlobalTickers } from '../redux/slices/ticker.slice'
import Ticker from '../Tickers/Ticker'
import { BINANCE_TICKER_STREAM, TICKER } from '../types/trade'

const MyTicker = () => {
	const [tickers, setTickers] = React.useState<Ticker[]>([])
	const [allowedTickers, setAllowedTickers] = useState<string[]>([])

	const { data: tickersData } = useTickerListHook();


	useEffect(() => {
		if (tickersData) {
			const tempTickers: TICKER[] = []
			tickersData.forEach((item: TICKER) => {
				tempTickers.push(item)
				setAllowedTickers(tempTickers.map(ticker => ticker.symbol))
			})
		}
	}, [tickersData]);

	const dispatch = useDispatch()

	useEffect(() => {
		const obj: any = {}
		for (let i = 0; i < tickers.length; i++) {
			obj[tickers[i].getName()] = tickers[i].getPrice()
		}
		dispatch(setGlobalTickers(obj));
	}, [tickers])

	useEffect(() => {
		const ws = new WebSocket('wss://stream.binance.com:9443/ws/!miniTicker@arr')
		ws.onopen = () => { console.log('connected') }

		ws.onmessage = (e) => {
			const data = JSON.parse(e.data)
			const tempTickers: Ticker[] = []

			data.forEach((item: BINANCE_TICKER_STREAM) => {
				const { s: symbol, c: currentPrice } = item
				if (!allowedTickers.includes(symbol)) return
				const ticker = new Ticker(symbol, parseFloat(currentPrice), 0);
				tempTickers.push(ticker)
			})


			setTickers(prev => {
				const newTickers = [...prev]
				tempTickers.forEach(tempTicker => {
					const index = newTickers.findIndex(ticker => ticker.getName() === tempTicker.getName())

					if (index > -1) {
						const prevPrice = newTickers[index].getPrice()
						const ticker = new Ticker(tempTicker.getName(), tempTicker.getPrice(), prevPrice)
						newTickers[index] = ticker
					} else {
						newTickers.push(tempTicker)
					}
				})
				return newTickers
			})


		}

		ws.onclose = () => { console.log('disconnected') }

		return () => {
			ws.close()
		}

	}, [allowedTickers])

	return (
		<Stack direction="row" spacing={1} alignItems="center">
			{
				tickers.map((ticker, index) => {
					return (
						<Stack direction="row" spacing={0.5} alignItems="center" key={ticker.getName()}>
							<Typography>{ticker.getName()}</Typography>
							<Typography variant='subtitle1' sx={{
								color: ticker.getColor()
							}}>
								{ticker.getPrice()}
							</Typography>
						</Stack>
					)
				})
			}
		</Stack >
	)
}

export default MyTicker