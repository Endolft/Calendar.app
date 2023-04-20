export const getEnvVariables = () => {
	return {
		VITE_API_URL: import.meta.env.production.VITE_API_URL,
	};
};
