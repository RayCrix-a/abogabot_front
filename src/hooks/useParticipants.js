import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  plaintiffResource, 
  defendantResource, 
  lawyerResource, 
  representativeResource 
} from '@/lib/apiClient';
import { toast } from 'react-toastify';

export const useParticipants = () => {
  const queryClient = useQueryClient();

  // Queries para obtener los participantes
  const { 
    data: plaintiffs = [], 
    isLoading: isLoadingPlaintiffs 
  } = useQuery({
    queryKey: ['plaintiffs'],
    queryFn: async () => {
      const response = await plaintiffResource.getAllPlaintiffs();
      return response.data;
    }
  });

  const { 
    data: defendants = [], 
    isLoading: isLoadingDefendants 
  } = useQuery({
    queryKey: ['defendants'],
    queryFn: async () => {
      const response = await defendantResource.getAllDefendants();
      return response.data;
    }
  });

  const { 
    data: lawyers = [], 
    isLoading: isLoadingLawyers 
  } = useQuery({
    queryKey: ['lawyers'],
    queryFn: async () => {
      const response = await lawyerResource.getAllLawyers();
      return response.data;
    }
  });

  const { 
    data: representatives = [], 
    isLoading: isLoadingRepresentatives 
  } = useQuery({
    queryKey: ['representatives'],
    queryFn: async () => {
      const response = await representativeResource.getAllRepresentatives();
      return response.data;
    }
  });

  // Mutaciones para crear participantes
  const createPlaintiffMutation = useMutation({
    mutationFn: async (data) => {
      const response = await plaintiffResource.createPlaintiff(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['plaintiffs']);
      toast.success('Demandante creado exitosamente');
    },
    onError: (error) => {
      toast.error(`Error al crear demandante: ${error.message}`);
    }
  });

  const createDefendantMutation = useMutation({
    mutationFn: async (data) => {
      const response = await defendantResource.createDefendant(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['defendants']);
      toast.success('Demandado creado exitosamente');
    },
    onError: (error) => {
      toast.error(`Error al crear demandado: ${error.message}`);
    }
  });

  const createLawyerMutation = useMutation({
    mutationFn: async (data) => {
      const response = await lawyerResource.createLawyer(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['lawyers']);
      toast.success('Abogado creado exitosamente');
    },
    onError: (error) => {
      toast.error(`Error al crear abogado: ${error.message}`);
    }
  });

  const createRepresentativeMutation = useMutation({
    mutationFn: async (data) => {
      const response = await representativeResource.createRepresentative(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['representatives']);
      toast.success('Representante creado exitosamente');
    },
    onError: (error) => {
      toast.error(`Error al crear representante: ${error.message}`);
    }
  });

  return {
    // Datos
    plaintiffs,
    defendants,
    lawyers,
    representatives,
    
    // Estados de carga
    isLoadingPlaintiffs,
    isLoadingDefendants,
    isLoadingLawyers,
    isLoadingRepresentatives,
    
    // Funciones para crear
    createPlaintiff: createPlaintiffMutation.mutateAsync,
    createDefendant: createDefendantMutation.mutateAsync,
    createLawyer: createLawyerMutation.mutateAsync,
    createRepresentative: createRepresentativeMutation.mutateAsync,
    
    // Estados de creación
    isCreatingPlaintiff: createPlaintiffMutation.isLoading,
    isCreatingDefendant: createDefendantMutation.isLoading,
    isCreatingLawyer: createLawyerMutation.isLoading,
    isCreatingRepresentative: createRepresentativeMutation.isLoading
  };
};