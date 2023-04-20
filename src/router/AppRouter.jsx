import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { CalendarRoute } from '../calendar/routes/CalendarRoute';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

export const AppRouter = () => {
	const { checkAuthToken, status } = useAuthStore();

	useEffect(() => {
		checkAuthToken();
	}, []);

	return (
		<Routes>
			{status === 'authenticated' ? (
				<Route path={'/*'} element={<CalendarRoute />} />
			) : (
				<>
					<Route path='/auth/*' element={<AuthRoutes />} />
					<Route path='/*' element={<Navigate to='auth/login' />} />
				</>
			)}
		</Routes>
	);
};
