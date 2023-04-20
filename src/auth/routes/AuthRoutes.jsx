import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes } from './routes';

export const AuthRoutes = () => {
	return (
		<Routes>
			{routes.map(({ Component, title, path }) => {
				return <Route path={path} key={path} element={<Component />}></Route>;
			})}
			<Route path={'/*'} element={<Navigate to='/auth/login' />} />
		</Routes>
	);
};
