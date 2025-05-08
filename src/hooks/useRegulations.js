import { useMutation } from '@tanstack/react-query';
import { regulationResource } from '@/lib/apiClient';
import { toast } from 'react-toastify';

/**
 * Hook para consultar regulaciones basadas en un relato
 */
export const useRegulations = () => {
  // Mutación para consultar regulaciones
  const lookupRegulationsMutation = useMutation({
    mutationFn: async (narrative) => {
      try {
        const response = await regulationResource.lookupRegulations({ narrative });
        return response.data;
      } catch (error) {
        console.error('Error al consultar regulaciones:', error);
        toast.error('Error al consultar regulaciones');
        throw error;
      }
    }
  });

  return {
    lookupRegulations: lookupRegulationsMutation.mutate,
    regulations: lookupRegulationsMutation.data || [],
    isLoading: lookupRegulationsMutation.isLoading,
    error: lookupRegulationsMutation.error
  };
};