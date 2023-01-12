import axios from "axios"

type LoginUserRequest = {
	username: string
	password: string
}

export const loginUser = async (data: LoginUserRequest) => {

	const response = await axios.post('/api/auth/login', data)
	return response.data

}