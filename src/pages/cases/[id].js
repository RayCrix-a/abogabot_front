import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import CaseDetails from '@/components/cases/CaseDetails';
import DocumentViewer from '@/components/document/DocumentViewer';
import ChatBox from '@/components/chat/ChatBox';
import { useCases } from '@/hooks/useCases';
import { useDocuments } from '@/hooks/useDocuments';
import { FiArrowLeft, FiFile, FiMessageCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function CaseDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState('document'); // 'document' o 'chat'
  
  // Obtener datos del caso y funciones para manipularlo
  const { useCase, deleteCase, updateCase, updateCaseStatus } = useCases();
  const { data: caseData, isLoading: isLoadingCase, error: caseError } = useCase(id);
  
  // Obtener documento asociado
  const { useDocument } = useDocuments();
  const documentId = caseData?.documentId || `doc-${id?.replace('case-', '')}`; // Simulación de relación
  const { data: documentData, isLoading: isLoadingDocument } = useDocument(documentId);

  // Manejar eliminación de caso
  const handleDeleteCase = async () => {
    try {
      await deleteCase(id);
      router.push('/dashboard');
    } catch (error) {
      toast.error(`Error al eliminar el caso: ${error.message}`);
    }
  };

  // Manejar cambio de estado del caso
  const handleStatusChange = async (newStatus) => {
    try {
      await updateCaseStatus(id, newStatus);
      // Si el caso pasa a finalizado y estamos en la página de casos, redirigir al historial
      if (newStatus === 'Finalizado' && router.pathname.includes('/cases/')) {
        toast.info('El caso ha sido finalizado y movido al historial');
      }
    } catch (error) {
      toast.error(`Error al cambiar el estado: ${error.message}`);
    }
  };

  // Manejar edición del caso
  const handleEditCase = async (updatedData) => {
    try {
      await updateCase(id, updatedData);
    } catch (error) {
      toast.error(`Error al actualizar el caso: ${error.message}`);
    }
  };

  // Si está cargando, mostrar indicador
  if (isLoadingCase) {
    return (
      <MainLayout title="Cargando caso..." description="Cargando detalles del caso">
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </MainLayout>
    );
  }

  // Si hay error, mostrar mensaje
  if (caseError) {
    return (
      <MainLayout title="Error" description="Error al cargar el caso">
        <div className="bg-red-900 text-red-200 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Error al cargar el caso</h2>
          <p>{caseError.message}</p>
          <Link href="/dashboard">
            <button className="mt-4 btn-primary">Volver al Dashboard</button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  // Si no hay datos, mostrar mensaje
  if (!caseData) {
    return (
      <MainLayout title="Caso no encontrado" description="El caso solicitado no existe">
        <div className="bg-dark p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-2 text-white">Caso no encontrado</h2>
          <p className="text-gray-400 mb-4">El caso que estás buscando no existe o ha sido eliminado.</p>
          <Link href="/dashboard">
            <button className="btn-primary">Volver al Dashboard</button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout 
      title={caseData.title} 
      description={`Detalles del caso: ${caseData.title}`}
    >
      {/* Cabecera */}
      <div className="mb-6">
        <Link href="/dashboard">
          <button className="flex items-center text-gray-400 hover:text-white mb-4">
            <FiArrowLeft className="mr-2" />
            Volver al Dashboard
          </button>
        </Link>
      </div>

      {/* Detalles del caso */}
      <CaseDetails 
        caseData={caseData} 
        onDelete={handleDeleteCase} 
        onStatusChange={handleStatusChange}
        onEdit={handleEditCase}
      />

      {/* Pestañas */}
      <div className="flex border-b border-gray-700 mt-6 mb-4">
        <button
          className={`py-2 px-4 font-medium flex items-center ${
            activeTab === 'document'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('document')}
        >
          <FiFile className="mr-2" />
          Documento
        </button>
        <button
          className={`py-2 px-4 font-medium flex items-center ${
            activeTab === 'chat'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('chat')}
        >
          <FiMessageCircle className="mr-2" />
          Chat
        </button>
      </div>

      {/* Contenido según pestaña activa */}
      <div className="bg-dark-lighter rounded-lg">
        {activeTab === 'document' ? (
          isLoadingDocument ? (
            <div className="p-6 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-gray-400">Cargando documento...</p>
            </div>
          ) : documentData ? (
            <DocumentViewer document={documentData} />
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-400">No se encontró ningún documento asociado a este caso.</p>
            </div>
          )
        ) : (
          <ChatBox caseId={id} />
        )}
      </div>
    </MainLayout>
  );
}
