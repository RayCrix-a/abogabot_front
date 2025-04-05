import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirigir según el estado de autenticación
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-2xl font-bold mb-2">AbogaBot</h1>
        <p>Cargando...</p>
      </div>
    </div>
  );
}
