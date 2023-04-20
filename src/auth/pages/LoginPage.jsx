import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useAuthStore, useForm } from '../../hooks';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { clearMessage } from '../../store/auth/authSlices';

export const LoginPage = () => {
	const { email, password, onInputChange } = useForm({
		email: '',
		password: '',
	});

	const dispatch = useDispatch();

	const { user, status, startLogin, errorMessage, checkAuthToken } =
		useAuthStore();

	const handlesubmit = (event) => {
		event.preventDefault();

		startLogin({ email: email, password: password });
	};

	useEffect(() => {
		if (errorMessage !== undefined) {
			Swal.fire('Error en la autenticación', errorMessage, 'error');
			dispatch(clearMessage());
		}
	}, [errorMessage]);

	return (
		<Grid container component='main' sx={{ height: '100vh' }}>
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage:
						'url(https://ccfprosario.com.ar/wp-content/uploads/horario-para-organizar-el-tiempo-de-estudio.jpg)',
					backgroundRepeat: 'no-repeat',
					backgroundColor: (t) =>
						t.palette.mode === 'light'
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign in
					</Typography>
					<Box component='form' noValidate sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							value={email}
							onChange={onInputChange}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							value={password}
							onChange={onInputChange}
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
						/>

						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							onClick={handlesubmit}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link href='/auth/register' variant='body2'>
									{'No tienes cuenta? Registrate'}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};
