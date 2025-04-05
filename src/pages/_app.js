import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  // Crear cliente de React Query
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
