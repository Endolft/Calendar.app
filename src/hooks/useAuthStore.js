import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import {
	clearMessage,
	onChecking,
	onLogin,
	onLogout,
} from '../store/auth/authSlices';
import { onLogoutCalendar } from '../store/calendar/calendarSlice';

export const useAuthStore = () => {
	const { status, user, errorMessage } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const startLogin = async ({ email, password }) => {
		dispatch(onChecking());

		console.log(email, password);

		try {
			const { data } = await calendarApi.post('/auth', { email, password });

			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			console.log(error);
			dispatch(onLogout('credenciales incorrectas'));
		}
	};

	const startRegister = async ({ name, email, password }) => {
		dispatch(onChecking());

		try {
			const { data } = await calendarApi.post('/auth/new', {
				name,
				email,
				password,
			});
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			console.log(error);
			const errorMsg = await error.response.data;

			if (Boolean(errorMsg.msg)) {
				dispatch(onLogout(errorMsg.msg));
				return;
			}
			const paramError = Object.keys(errorMsg.errors).toString();

			if (paramError.includes(',')) {
				dispatch(onLogout('revise todos los campos'));
				return;
			}

			let errorMessage = await errorMsg[paramError].msg;

			dispatch(onLogout(errorMessage));
		}
	};

	const checkAuthToken = async () => {
		const token = localStorage.getItem('token');
		if (!token) return dispatch(onLogout());

		try {
			const { data } = await calendarApi.get('auth/renew');
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(onLogin({ name: data.name, uid: data.uid }));
		} catch (error) {
			localStorage.clear();
			dispatch(onLogout());
		}
	};

	const startLogout = async () => {
		localStorage.clear();
		dispatch(onLogoutCalendar());
		dispatch(onLogout());
	};
	return {
		//*propiedads
		errorMessage,
		user,
		status,
		// metodos
		startLogin,
		startLogout,
		startRegister,
		checkAuthToken,
	};
};
