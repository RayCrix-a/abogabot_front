import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import CaseDetails from '@/components/cases/CaseDetails';
import DocumentViewer from '@/components/document/DocumentViewer';
import ChatBox from '@/components/chat/ChatBox';
import { useLawsuits } from '@/hooks/useLawsuits';
import { FiArrowLeft, FiFile, FiMessageCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function CaseDetail() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState('document'); // 'document' o 'chat'
  const [markdownContent, setMarkdownContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Obtener datos del caso usando los nuevos hooks
  const { 
    useLawsuit, 
    deleteLawsuit, 
    updateLawsuit,
    updateLawsuitStatus,
    useLawsuitLastRevisions,
    generate,
    loading: isLoadingGeneration
  } = useLawsuits();
  
  const { data: lawsuit, isLoading: isLoadingLawsuit, error: lawsuitError } = useLawsuit(id);

  const { data: revision, isLoading: isLoadingRevision, error: revisiontError } = useLawsuitLastRevisions(id);

  useEffect(() => {
    // Si el documento tiene contenido, establecerlo    
    if (revision) {
      setMarkdownContent(revision);
    }
  }, [revision]);  
  // Manejar eliminación de caso  
const handleDeleteCase = async () => {
  if (!id) return false;
  
  try {
    console.log(`Intentando eliminar caso con ID: ${id}`);
    await deleteLawsuit(id);
    toast.success('Demanda eliminada exitosamente');
    router.push('/dashboard');
    return true;
  } catch (error) {
    console.error('Error al eliminar demanda:', error);
    // Error más específico en el toast para depuración
    toast.error(`Error al eliminar la demanda: ${error.message || 'Error desconocido'}`);
    return false;
  }
};
  // Manejar cambio de estado del caso
  const handleStatusChange = async (newStatus) => {
    try {
      if (!id || !lawsuit) return;
      
      // Creamos un objeto que cumple con la interfaz LawsuitRequest
      const updateData = {
        proceedingType: lawsuit.proceedingType.name,
        subjectMatter: lawsuit.subjectMatter,
        status: newStatus,
        plaintiffs: lawsuit.plaintiffs.map(p => p.idNumber),
        defendants: lawsuit.defendants.map(d => d.idNumber),
        attorneyOfRecord: lawsuit.attorneyOfRecord?.idNumber,
        representative: lawsuit.representative?.idNumber,
        claims: lawsuit.claims,
        institution: lawsuit.institution,
        narrative: lawsuit.narrative
      };
      
      await updateLawsuit(id, updateData);
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
      toast.error(`Error al cambiar el estado: ${error.message || 'Error desconocido'}`);
    }
  };

  // Manejar edición del caso
  const handleEditCase = async (updatedData) => {
    try {
      await updateLawsuit(id, updatedData);
    } catch (error) {
      console.error('Error al actualizar el caso:', error);
      toast.error(`Error al actualizar el caso: ${error.message || 'Error desconocido'}`);
    }
  };

  // Generar documento
  const handleGenerateDocument = async () => {
    if (!id) return;
    
    // Limpiar el contenido antes de generar
    setMarkdownContent('');
    setIsGenerating(true);
    
    try {
      await generate(id, (chunk) => {
        // Actualizar el contenido del documento con cada chunk recibido
        setMarkdownContent(prev => prev + chunk);
      });
      toast.success('Documento generado exitosamente');
    } catch (error) {
      console.error('Error al generar documento:', error);
      toast.error(`Error al generar el documento: ${error.message || 'Error desconocido'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Si está cargando, mostrar indicador
  if (isLoadingLawsuit) {
    return (
      <MainLayout title="Cargando caso..." description="Cargando detalles del caso">
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </MainLayout>
    );
  }

  // Si hay error, mostrar mensaje
  if (lawsuitError) {
    return (
      <MainLayout title="Error" description="Error al cargar el caso">
        <div className="bg-red-900 text-red-200 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Error al cargar el caso</h2>
          <p>{lawsuitError.message || 'Error desconocido'}</p>
          <Link href="/dashboard">
            <button className="mt-4 btn-primary">Volver al Dashboard</button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  // Si no hay datos, mostrar mensaje
  if (!lawsuit) {
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

  // Construir título de la página
  const pageTitle = lawsuit.subjectMatter || 'Detalles de caso';

  return (
    <MainLayout 
      title={pageTitle} 
      description={`Detalles del caso: ${pageTitle}`}
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
        caseData={lawsuit} 
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
          <DocumentViewer 
            documentData={{
              title: `Demanda: ${lawsuit.subjectMatter}`,
              content: markdownContent,
              status: 'En curso'
            }} 
            lawsuit={lawsuit}
            onGenerateDocument={handleGenerateDocument}
          />
        ) : (
          <ChatBox caseId={id} />
        )}
      </div>
    </MainLayout>
  );
}