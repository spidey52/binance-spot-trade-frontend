
export const handleApiError = (error: any) => {
	if (error.response) {
		// Request made and server responded
		const { data, status } = error.response
	} else if (error.request) {
		// The request was made but no response was received
		console.log(error.request)
	} else {
		// Something happened in setting up the request that triggered an Error
		console.log('Error', error.message)
	}

}