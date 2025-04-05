import { FcGoogle } from 'react-icons/fc';
import { BsMicrosoft } from 'react-icons/bs';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';

const ProviderButtons = () => {
  const { loginWithProvider, loading } = useAuth();

  // Función para manejar la autenticación con proveedores
  const handleProviderLogin = async (provider) => {
    try {
      await loginWithProvider(provider);
      toast.success(`Inicio de sesión con ${provider} exitoso`);
    } catch (error) {
      toast.error(`Error al iniciar sesión con ${provider}`);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Botón de Google */}
      <button
        type="button"
        disabled={loading}
        onClick={() => handleProviderLogin('Google')}
        className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-700 rounded-md 
                  hover:bg-dark-light transition duration-150 text-white"
      >
        <FcGoogle className="w-5 h-5" />
        <span>Google</span>
      </button>

      {/* Botón de Microsoft */}
      <button
        type="button"
        disabled={loading}
        onClick={() => handleProviderLogin('Microsoft')}
        className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-700 rounded-md 
                  hover:bg-dark-light transition duration-150 text-white"
      >
        <BsMicrosoft className="w-4 h-4 text-blue-500" />
        <span>Microsoft</span>
      </button>
    </div>
  );
};

export default ProviderButtons;
