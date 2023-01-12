import { Alert, Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { loginUser } from '../api/auth.api'
import { handleApiError } from '../error/handleApiError'

const LoginPage = () => {
	const [username, setUsername] = React.useState('')
	const [password, setPassword] = React.useState('')

	const [error, setError] = React.useState('')

	const handleSubmit = async () => {
		if (!username || !password) {
			return setError('Please enter username and password')
		}

		try {
			await loginUser({ username, password })
		} catch (error) {
			handleApiError(error)
		}
	}


	return (
		<Box>
			<Typography>Login Page</Typography>

			{
				error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
			}

			<TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} />
			<TextField label="password" type="password" value={username} onChange={e => setPassword(e.target.value)} />
			<Button onClick={handleSubmit}>Login</Button>

		</Box>
	)
}

export default LoginPage