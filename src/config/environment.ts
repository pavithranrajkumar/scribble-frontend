interface Environment {
  apiUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

export const environment: Environment = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
