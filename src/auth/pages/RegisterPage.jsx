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
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../../store/auth/authSlices';

export const RegisterPage = () => {
	const { onInputChange, name, email, password, formState, passwordRepeat } =
		useForm({
			name: '',
			email: '',
			password: '',
			passwordRepeat: '',
		});
	const { errorMessage } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const { startRegister } = useAuthStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== passwordRepeat) {
			Swal.fire(
				'las contraseñas no coinciden',
				'revise que las contraseñas coincidan',
				'error'
			);
			return;
		}
		startRegister({ name: name, email: email, password: password });
	};

	useEffect(() => {
		if (errorMessage !== undefined) {
			Swal.fire('problemas con el registro', errorMessage, 'error');
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
						'url(https://geekflare.com/wp-content/uploads/2022/07/Untitled-design-2-1-1500x1125.png)',
					backgroundRepeat: 'no-repeat',
					backgroundColor: (t) =>
						t.palette.mode === 'light'
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<Grid item xs={16} sm={8} md={5} component={Paper} elevation={6} square>
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
						Crea tu cuenta
					</Typography>
					<Box component='form' noValidate sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='name'
							label='Nombre'
							name='name'
							value={name}
							onChange={onInputChange}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email '
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
							label='Contraseña'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='passwordRepeat'
							value={passwordRepeat}
							onChange={onInputChange}
							label='Repita la contraseña'
							type='password'
							id='passwordrepeat'
							autoComplete='current-password'
						/>

						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							onClick={handleSubmit}
						>
							Registrarse
						</Button>
						<Grid container>
							<Grid item>
								<Link href='/auth/login' variant='body2'>
									{'ya tienes cuenta?'}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};
