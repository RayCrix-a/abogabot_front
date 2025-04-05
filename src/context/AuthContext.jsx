import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Crear el contexto de autenticación
const AuthContext = createContext({});

// Mock de usuarios para autenticación
const mockUsers = [
  { email: 'usuario@ejemplo.com', password: 'password123' },
  { email: 'admin@abogabot.com', password: 'admin123' }
];

// Proveedor del contexto de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Verificar si hay un usuario guardado en localStorage al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem('abogabot_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error parsing stored user:', err);
        localStorage.removeItem('abogabot_user');
      }
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión con email y contraseña
  const login = async (email, password, remember) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulación de autenticación con los usuarios mock
      const foundUser = mockUsers.find(
        user => user.email === email && user.password === password
      );
      
      if (!foundUser) {
        throw new Error('Credenciales inválidas');
      }
      
      const userData = {
        email: foundUser.email,
        name: foundUser.email.split('@')[0],
        avatar: `/api/avatar/${foundUser.email}`
      };
      
      // Guardar en localStorage si remember está activado
      if (remember) {
        localStorage.setItem('abogabot_user', JSON.stringify(userData));
      }
      
      setUser(userData);
      router.push('/dashboard');
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para iniciar sesión con proveedores (Google, Microsoft)
  const loginWithProvider = async (provider) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulación de autenticación con proveedores
      const userData = {
        email: `user_${Math.floor(Math.random() * 1000)}@${provider.toLowerCase()}.com`,
        name: `Usuario ${provider}`,
        avatar: `/api/avatar/${provider.toLowerCase()}`,
        provider
      };
      
      localStorage.setItem('abogabot_user', JSON.stringify(userData));
      setUser(userData);
      router.push('/dashboard');
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('abogabot_user');
    setUser(null);
    router.push('/login');
  };

  // Valores que estarán disponibles en el contexto
  const value = {
    user,
    loading,
    error,
    login,
    loginWithProvider,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
