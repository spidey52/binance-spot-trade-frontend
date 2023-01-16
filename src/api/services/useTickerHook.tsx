import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { API_URL } from "../../config/apiEndPoint"
import { TICKER } from "../../types/trade"


export const useTickerListHook = () => {

	const fetchTicker = async () => {
		return axios.get(API_URL.TICKER_LIST)
	}

	return useQuery(['ticker'], fetchTicker, {
		select: (data) => data.data as TICKER[],
		cacheTime: Infinity
	})

}

export const useCreateTickerHook = () => {

	const createTicker = async (ticker: string) => {
		return axios.post(API_URL.TICKER_LIST, { ticker })
	}

	const queryClient = useQueryClient()

	return useMutation(createTicker, {
		onSuccess: () => {
			queryClient.invalidateQueries(['ticker'])
		}
	})

}
