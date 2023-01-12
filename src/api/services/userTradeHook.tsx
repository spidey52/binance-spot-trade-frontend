import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { API_URL } from "../../config/apiEndPoint"
import { TRADE_STATUS } from "../../types/trade"


type tradeParams = {
	status?: TRADE_STATUS,
	symbol?: string
}



export const useTradeListHook = ({ status, symbol }: tradeParams) => {
	const params: any = {}

	if (status && status !== "ALL") params.status = status
	if (symbol) params.symbol = symbol

	const fetchTrades = async () => {
		return axios.get(API_URL.TRADE_LIST, { params })
	}

	return useQuery(['trades', status], fetchTrades, {
		select: (data) => data.data,
	})

}

export const useCreateTradeHook = () => {
	const createTrade = async (trade: any) => {
		return axios.post(API_URL.TRADE_LIST, trade)
	}

	const queryClient = useQueryClient()

	return useMutation(createTrade, {
		onSuccess: () => {
			queryClient.invalidateQueries(['trades'])
		}
	})
}

export const useUpdateTradeHook = () => {
	const updateTrade = async (trade: any) => {
		return axios.patch(`${API_URL.TRADE_LIST}/${trade.id}`, trade)
	}

	const queryClient = useQueryClient()

	return useMutation(updateTrade, {
		onSuccess: () => {
			queryClient.invalidateQueries(['trades'])
		}
	})
}

export const useDeleteTradeHook = () => {
	const deleteTrade = async (id: string) => {
		return axios.delete(`${API_URL.TRADE_LIST}/${id}`)
	}

	const queryClient = useQueryClient()

	return useMutation(deleteTrade, {
		onSuccess: () => {
			queryClient.invalidateQueries(['trades'])
		}
	})
}