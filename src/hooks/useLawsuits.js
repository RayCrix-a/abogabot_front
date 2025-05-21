import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lawsuitResource } from '@/lib/apiClient';
import { toast } from 'react-toastify';
import { useState, useCallback } from 'react';
import { ContentType } from '@/generated/api/http-client'; // Añade esta importación
/**
 * Hook para gestionar demandas legales
 * Proporciona funciones para listar, obtener, crear y eliminar demandas
 */
export const useLawsuits = () => {
  const queryClient = useQueryClient();

  // Query para obtener todas las demandas
  const {
    data: lawsuits,
    isLoading: isLoadingLawsuits,
    error: lawsuitsError,
    refetch: refetchLawsuits
  } = useQuery({
    queryKey: ['lawsuits'],
    queryFn: async () => {
      const response = await lawsuitResource.getAllLawsuits();
      return response.data;
    }
  });

  // Mutación para crear una nueva demanda
  const createLawsuitMutation = useMutation({
    mutationFn: async (data) => {
      const response = await lawsuitResource.createLawsuit(data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['lawsuits'] });
      toast.success('Demanda creada exitosamente');
    },
    onError: (error) => {
      console.error('Error al crear demanda:', error);
      toast.error(`Error al crear la demanda: ${error.message || 'Error desconocido'}`);
    }
  });

  // Mutación para actualizar una demanda
  const updateLawsuitMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await lawsuitResource.updateLawsuit(id, data);
      return response.data;
    },
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['lawsuits'] });
      queryClient.invalidateQueries({ queryKey: ['lawsuit'] });
      toast.success('Demanda actualizada exitosamente');
    },
    onError: (error) => {
      console.error('Error al actualizar demanda:', error);
      toast.error(`Error al actualizar la demanda: ${error.message || 'Error desconocido'}`);
    }
  });
  
  // Mutación para eliminar una demanda
const deleteLawsuitMutation = useMutation({
  onMutate: async (deletedId) => {
    await queryClient.cancelQueries(['lawsuits']);
    const previousLawsuits = queryClient.getQueryData(['lawsuits']);
    
    // Optimisticamente actualizar la UI
    if (previousLawsuits) {
      queryClient.setQueryData(['lawsuits'], 
        previousLawsuits.filter(l => l.id !== deletedId)
      );
    }
    
    return { previousLawsuits };
  },
  onError: (err, variables, context) => {
    console.error('Error en mutación de eliminación:', err);
    
    // Si algo falla, revertir a los datos anteriores
    if (context?.previousLawsuits) {
      queryClient.setQueryData(['lawsuits'], context.previousLawsuits);
    }
  },
  onSettled: () => {
    // Siempre refrescar los datos
    queryClient.invalidateQueries(['lawsuits']);
  }
});

  // Mutación para actualizar el estado de una demanda
  const updateLawsuitStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await lawsuitResource.updateLawsuit(id, { status });
      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['lawsuits']);
      queryClient.invalidateQueries(['lawsuit', id]);
      toast.success('Estado actualizado exitosamente');
    },
    onError: (error) => {
      console.error('Error al actualizar el estado:', error);
    }
  });

  /**
   * Función para obtener una demanda por ID
   * @param {number} id - Identificador de la demanda
   * @returns {Object} - Query result con la demanda solicitada
   */
  const useLawsuit = (id) => {
    return useQuery({
      queryKey: ['lawsuit', id],
      queryFn: async () => {
        if (!id) return null;
        const response = await lawsuitResource.getLawsuit(id);
        return response.data;
      },
      enabled: !!id // Solo ejecutar si hay un ID
    });
  };

  /**
   * Función para obtener revisiones de una demanda
   * @param {number} id - Identificador de la demanda
   * @returns {Object} - Query result con las revisiones
   */
  const useLawsuitRevisions = (id) => {
    return useQuery({
      queryKey: ['lawsuit-revisions', id],
      queryFn: async () => {
        if (!id) return [];
        const response = await lawsuitResource.getRevisions(id);
        return response.data;
      },
      enabled: !!id
    });
  };

  /**
   * Función para obtener revisiones de una demanda
   * @param {number} id - Identificador de la demanda
   * @returns {string} - Query result con las revisiones
   */
  const useLawsuitLastRevisions = (id) => {
    return useQuery({
      queryKey: ['lawsuit-last-revisions', id],
      queryFn: async () => {
        if (!id) return null;
        try {
          const response = await lawsuitResource.getRevisions(id);
          const innerResponse = response.data;
          if (!innerResponse || innerResponse.length === 0) return null;
          const lastRevision = innerResponse.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
          const responseRevision = await lawsuitResource.getRevisionResponse(id, lastRevision.uuid);
          return await responseRevision.text();
        } catch (error) {
          console.error('Error fetching last revisions:', error);
          return null;
        }
      },
      enabled: !!id && id !== 'undefined',
      retry: false
    });
  };

  /**
   * Función para obtener una revisión específica
   * @param {number} id - Identificador de la demanda
   * @param {string} uuid - Identificador de la revisión
   * @returns {Object} - Query result con la revisión
   */
  const useLawsuitRevision = (id, uuid) => {
    return useQuery({
      queryKey: ['lawsuit-revision', id, uuid],
      queryFn: async () => {
        if (!id || !uuid) return null;
        const response = await lawsuitResource.getRevisionResponse(id, uuid);
        return response.data;
      },
      enabled: !!(id && uuid)
    });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = useCallback(async (id, onProgress) => {
    try {
      setLoading(true);
      console.log(`Iniciando generación de documento para caso ID: ${id}`);
      
      const response = await lawsuitResource.request({
        path: `/lawsuit/${id}/generate`,
        method: 'POST',
        baseUrl: process.env.NEXT_PUBLIC_ABOGABOT_GENERATOR_URL,
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`Error al generar documento: ${response.statusText}`);
      }

      // Procesar el stream de respuesta
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        // Decodificar el chunk y acumularlo
        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;
        
        // Llamar al callback de progreso si existe
        if (onProgress) {
          onProgress(chunk);
        }
      }

      return accumulatedContent;
    } catch (error) {
      console.error('Error en generateLawsuitDocument:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    lawsuits,
    isLoadingLawsuits,
    lawsuitsError,
    refetchLawsuits,
    useLawsuit,
    useLawsuitRevisions,
    useLawsuitRevision,
    useLawsuitLastRevisions,
    createLawsuit: createLawsuitMutation.mutate,
    isCreatingLawsuit: createLawsuitMutation.isLoading,
    updateLawsuit: (id, data) => updateLawsuitMutation.mutate({ id, data }),
    isUpdatingLawsuit: updateLawsuitMutation.isLoading,
    deleteLawsuit: deleteLawsuitMutation.mutate,
    isDeletingLawsuit: deleteLawsuitMutation.isLoading,
    updateLawsuitStatus: (id, status) => updateLawsuitStatusMutation.mutate({ id, status }),
    isUpdatingStatus: updateLawsuitStatusMutation.isLoading,
    loading,
    error,
    generate
  };
};