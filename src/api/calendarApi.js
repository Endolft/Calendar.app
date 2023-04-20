import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const caldendarApi = axios.create({
	baseURL: VITE_API_URL,
});

// todo : configurar interceptores

caldendarApi.interceptors.request.use((config) => {
	config.headers = {
		...config.headers,
		'x-token': localStorage.getItem('token'),
	};

	return config;
});

export default caldendarApi;
