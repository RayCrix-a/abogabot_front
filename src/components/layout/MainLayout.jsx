import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '@/context/AuthContext';

const MainLayout = ({ children, title, description }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Efecto para manejar la hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirigir a login si no está autenticado
  if (typeof window !== 'undefined' && !isAuthenticated) {
    router.push('/login');
    return null;
  }

  // Función para alternar la visibilidad del sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // No renderizan la interfaz hasta que estemos en el cliente
  if (!isMounted) {
    return null; // O un esqueleto de carga
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} | AbogaBot` : 'AbogaBot - Su asistente legal con AI'}</title>
        <meta 
          name="description" 
          content={description || 'AbogaBot - Plataforma de asistencia legal con inteligencia artificial'} 
        />
      </Head>

      <div className="flex h-screen bg-dark overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Contenido principal */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Navbar superior */}
          <Navbar toggleSidebar={toggleSidebar} />

          {/* Contenido */}
          <main className="flex-1 overflow-y-auto bg-dark-lighter p-4">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
