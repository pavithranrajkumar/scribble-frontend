import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import { client } from './lib/apollo';
import { AuthProvider } from './context/auth.context';
import { AppRoutes } from './routes';

function AppContent() {
  return (
    <AuthProvider>
      <div className='min-h-screen bg-background font-sans antialiased'>
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Toaster position='top-center' />
        <AppContent />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
