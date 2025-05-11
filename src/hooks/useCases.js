import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lawsuitResource } from '@/lib/apiClient';
import { toast } from 'react-toastify';

/**
 * Hook para gestionar casos legales
 * Proporciona funciones para listar, obtener, crear y eliminar casos
 */
export const useCases = () => {
  const queryClient = useQueryClient();

  // Query para obtener todos los casos
  const {
    data: cases,
    isLoading: isLoadingCases,
    error: casesError,
    refetch: refetchCases
  } = useQuery({
    queryKey: ['cases'],
    queryFn: async () => {
      const response = await lawsuitResource.getAllLawsuits();
      return response.data;
    }
  });

  // Mutación para crear un nuevo caso
  const createCaseMutation = useMutation({
    mutationFn: async (data) => {
      const lawsuitRequest = {
        proceedingType: data.proceedingType,
        subjectMatter: data.legalMatter,
        plaintiffs: [data.plaintiffId],
        defendants: [data.defendantId],
        attorneyOfRecord: data.attorneyId || undefined,
        representative: data.representativeId || undefined,
        claims: data.claims || [],
        institution: data.institution,
        narrative: data.description
      };

      console.log('Enviando datos a la API:', lawsuitRequest);
      const response = await lawsuitResource.createLawsuit(lawsuitRequest);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['lawsuits']);
      toast.success('Caso creado exitosamente');
    },
    onError: (error) => {
      console.error('Error al crear caso:', error);
      toast.error(`Error al crear el caso: ${error.message}`);
    }
  });

  // Mutación para eliminar un caso
  const deleteCaseMutation = useMutation({
    mutationFn: async (id) => {
      const response = await lawsuitResource.deleteLawsuit(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      toast.success('Caso eliminado exitosamente');
    },
    onError: (error) => {
      toast.error(`Error al eliminar el caso: ${error.message}`);
    }
  });

  // Mutación para actualizar un caso
  const updateCaseMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await lawsuitResource.updateLawsuit(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      queryClient.invalidateQueries({ queryKey: ['case'] });
      toast.success('Caso actualizado exitosamente');
    },
    onError: (error) => {
      toast.error(`Error al actualizar el caso: ${error.message}`);
    }
  });

  // Mutación para actualizar el estado de un caso
  const updateCaseStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await lawsuitResource.updateLawsuitStatus(id, status);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      queryClient.invalidateQueries({ queryKey: ['case'] });
      toast.success('Estado del caso actualizado');
    },
    onError: (error) => {
      toast.error(`Error al actualizar el estado: ${error.message}`);
    }
  });
  /**
   * Función para obtener un caso por ID
   * @param {string} id - Identificador del caso
   * @returns {Object} - Query result con el caso solicitado
   */
  const useCase = (id) => {
    return useQuery({
      queryKey: ['case', id],
      queryFn: async () => {
        const response = await lawsuitResource.getLawsuitById(id);
        return response.data;
      },
      enabled: !!id // Solo ejecutar si hay un ID
    });
  };
  return {
    cases,
    isLoadingCases,
    casesError,
    refetchCases,
    useCase,
    createCase: createCaseMutation.mutateAsync,
    isCreatingCase: createCaseMutation.isLoading,
    updateCase: (id, data) => updateCaseMutation.mutate({ id, data }),
    isUpdatingCase: updateCaseMutation.isLoading,
    updateCaseStatus: (id, status) => updateCaseStatusMutation.mutate({ id, status }),
    isUpdatingStatus: updateCaseStatusMutation.isLoading,
    deleteCase: deleteCaseMutation.mutate,
    isDeletingCase: deleteCaseMutation.isLoading
  };
};
