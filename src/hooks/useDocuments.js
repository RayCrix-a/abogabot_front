import { useQuery, useMutation } from '@tanstack/react-query';
import { getDocumentById, downloadDocument, shareDocument } from '@/lib/api';
import { toast } from 'react-toastify';

/**
 * Hook para gestionar documentos legales
 * Proporciona funciones para obtener, descargar y compartir documentos
 */
export const useDocuments = () => {
  // Mutación para descargar un documento
  const downloadMutation = useMutation({
    mutationFn: downloadDocument,
    onSuccess: (data) => {
      toast.success('Documento descargado correctamente');
      // En una implementación real, aquí se iniciaría la descarga del archivo
      console.log('Iniciando descarga:', data.filename);
    },
    onError: (error) => {
      toast.error(`Error al descargar el documento: ${error.message}`);
    }
  });

  // Mutación para compartir un documento
  const shareMutation = useMutation({
    mutationFn: shareDocument,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(`Error al compartir el documento: ${error.message}`);
    }
  });

  /**
   * Función para obtener un documento por ID
   * @param {string} id - Identificador del documento
   * @returns {Object} - Query result con el documento solicitado
   */
  const useDocument = (id) => {
    return useQuery({
      queryKey: ['document', id],
      queryFn: () => getDocumentById(id),
      enabled: !!id // Solo ejecutar si hay un ID
    });
  };

  return {
    useDocument,
    downloadDocument: downloadMutation.mutate,
    isDownloading: downloadMutation.isLoading,
    shareDocument: shareMutation.mutate,
    isSharing: shareMutation.isLoading
  };
};
