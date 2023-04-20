import { useAuthStore } from '../../hooks/useAuthStore';
import {
	Grid,
	IconButton,
	Typography,
	Toolbar,
	Box,
	AppBar,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export const Navbar = () => {
	const { startLogout, user } = useAuthStore();

	const onlogout = () => {
		startLogout();
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton edge='start' color='inherit' aria-label='menu'>
						<AccountCircleIcon sx={{ height: '40px', width: '40px' }} />
					</IconButton>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						{user.name}
					</Typography>
					<Grid item>
						<IconButton color='black' component='label' onClick={onlogout}>
							<LogoutIcon />
						</IconButton>
					</Grid>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
