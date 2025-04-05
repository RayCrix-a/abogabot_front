import { useState } from 'react';
import { FiDownload, FiShare2, FiEye } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { downloadDocument, shareDocument } from '@/lib/api';

const DocumentViewer = ({ document }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Mutación para descargar el documento
  const downloadMutation = useMutation({
    mutationFn: downloadDocument,
    onSuccess: (data) => {
      // Simulación de descarga creando un objeto Blob y descargándolo
      const content = document.content;
      const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      
      // Crear un link temporal para la descarga
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = data.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Documento descargado correctamente');
      setIsDownloading(false);
    },
    onError: (error) => {
      toast.error(`Error al descargar el documento: ${error.message}`);
      setIsDownloading(false);
    }
  });
  
  // Mutación para compartir el documento
  const shareMutation = useMutation({
    mutationFn: ({ documentId, email }) => shareDocument(documentId, email),
    onSuccess: (data) => {
      toast.success(data.message);
      setShowShareModal(false);
      setEmail('');
    },
    onError: (error) => {
      toast.error(`Error al compartir el documento: ${error.message}`);
    }
  });
  
  // Función para manejar la descarga
  const handleDownload = () => {
    setIsDownloading(true);
    downloadMutation.mutate(document.id);
  };
  
  // Función para manejar compartir
  const handleShare = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Por favor ingrese un correo electrónico');
      return;
    }
    shareMutation.mutate({ documentId: document.id, email });
  };
  
  // Función para ver la vista previa
  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  // Función para obtener color según estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'Finalizado':
        return 'bg-green-900 text-green-300';
      case 'Pendiente':
        return 'bg-yellow-900 text-yellow-300';
      case 'En curso':
      default:
        return 'bg-blue-900 text-blue-300';
    }
  };

  return (
    <div className="bg-dark-lighter rounded-lg overflow-hidden">
      <div className="p-5">
        <h2 className="text-xl font-bold mb-4">{document.title}</h2>
        
        {/* Contenido del documento */}
        <div className="bg-dark p-4 rounded-md border border-gray-700 mb-4 font-mono text-sm text-gray-300 whitespace-pre-wrap max-h-96 overflow-y-auto">
          {document.content}
        </div>
        
        {/* Información del documento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">Detalles del documento</h3>
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-2 text-gray-400">Tipo de documento</td>
                  <td className="py-2 text-white">{document.type}</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 text-gray-400">Páginas</td>
                  <td className="py-2 text-white">{document.pages}</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 text-gray-400">Estado</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                      {document.status}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 text-gray-400">Última actualización</td>
                  <td className="py-2 text-white">{document.lastUpdate}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Registro de actividades</h3>
            <div className="space-y-3">
              {document.activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                    {activity.icon || '📝'}
                  </div>
                  <div>
                    <p className="text-white">{activity.description}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={togglePreview}
            className="btn flex items-center gap-2 bg-blue-900 text-blue-300 hover:bg-blue-800"
          >
            <FiEye className="w-4 h-4" />
            Vista previa del doc
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="btn flex items-center gap-2 bg-green-900 text-green-300 hover:bg-green-800"
          >
            <FiDownload className="w-4 h-4" />
            {isDownloading ? 'Descargando...' : 'Descargar'}
          </button>
          <button
            onClick={() => setShowShareModal(true)}
            className="btn flex items-center gap-2 bg-purple-900 text-purple-300 hover:bg-purple-800"
          >
            <FiShare2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
      
      {/* Vista previa del documento (modal) */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
            <div className="bg-gray-100 border-b p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Vista previa del documento</h3>
              <button 
                onClick={togglePreview}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              {/* Componente de vista previa del documento */}
              <div className="bg-white p-6 font-serif text-black">
                <h1 className="text-center text-xl font-bold mb-6">DEMANDA CIVIL POR INCUMPLIMIENTO DE CONTRATO</h1>
                <p className="mb-3">Señor Juez:</p>
                <p className="mb-3">
                  Yo, {document.plaintiffName}, cédula de identidad {document.plaintiffId}, con domicilio en {document.plaintiffAddress}, 
                  interpongo demanda civil en contra de {document.defendantName}, cédula de identidad {document.defendantId}, 
                  con domicilio en {document.defendantAddress}, por incumplimiento de contrato.
                </p>
                <p className="mb-3">
                  Con fecha {document.contractDate}, las partes suscribimos un contrato en el cual el demandado se obligó a {document.obligation}, 
                  compromiso que hasta la fecha no ha cumplido, causando perjuicio a mi persona.
                </p>
                <p className="mb-3">
                  Por lo expuesto, ruego a SS. tener por interpuesta la demanda, dar curso a la misma y, en definitiva, acogerla en todas sus partes, 
                  con expresa condena en costas.
                </p>
                <div className="mt-10">
                  <p className="mb-1">{document.plaintiffName}</p>
                  <p>{document.plaintiffId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para compartir documento */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-dark-lighter rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-white mb-4">Compartir documento</h3>
            <form onSubmit={handleShare}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingrese el correo electrónico"
                  className="input-field"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={shareMutation.isLoading}
                >
                  {shareMutation.isLoading ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;
