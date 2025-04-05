import { useEffect } from 'react';

/**
 * Hook para detectar clics fuera de un elemento
 * @param {React.RefObject} ref - Referencia al elemento a monitorear
 * @param {Function} callback - Función a ejecutar cuando se detecta un clic fuera
 */
export const useDetectClickOutside = (ref, callback) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Agregar event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Limpiar event listener al desmontar
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
