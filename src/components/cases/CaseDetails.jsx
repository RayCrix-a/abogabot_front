import { useState } from 'react';
import { parseISO, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FiEdit, FiTrash2, FiMessageSquare } from 'react-icons/fi';
import { toast } from 'react-toastify';
import EditCaseForm from './EditCaseForm';

const CaseDetails = ({ caseData, onDelete, onStatusChange }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return dateString || 'Fecha no disponible';
    }
  }; 
  
  // Función para manejar la eliminación del caso
const handleDelete = async () => {
  if (isConfirmingDelete) {
    try {
      setIsDeleting(true);
      console.log('Usuario confirmó eliminación en CaseDetails');
      console.log('Llamando a onDelete() - ID de caso:', caseData?.id);
      const success = await onDelete();
      console.log('Resultado de onDelete:', success);
      if (success) {
        setIsConfirmingDelete(false);
        // No añadimos toast aquí porque se manejará en useLawsuits.js o [id].js
      } else {
        toast.error('No se pudo eliminar el caso');
        console.log('onDelete no retornó true, manteniendo estado de confirmación');
      }
    } catch (error) {
      console.error('Error capturado en CaseDetails durante eliminación:', error);
      toast.error(`Error al eliminar el caso: ${error.message || 'Error desconocido'}`);
      setIsConfirmingDelete(false); // Reset del estado para permitir intentar de nuevo
    } finally {
      setIsDeleting(false);
    }
  } else {
    setIsConfirmingDelete(true);
  }
};
  
  // Cancelar eliminación
  const cancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  // Iniciar edición
  const startEditing = () => {
    setIsEditing(true);
  };

  // Cancelar edición
  const cancelEditing = () => {
    setIsEditing(false);
  };  // Obtener el estado para mostrar
  const getDisplayStatus = (status) => {
    const statusMap = {
      'IN_PROGRESS': 'En curso',
      'PENDING': 'Pendiente',
      'FINALIZED': 'Finalizado',
      'DRAFT': 'Borrador'
    };
    return statusMap[status] || status;
  };  // Función para cambiar el estado
  const handleStatusChange = async (event) => {
    const statusMap = {
      'En curso': 'IN_PROGRESS',
      'Pendiente': 'PENDING',
      'Finalizado': 'FINALIZED',
      'Borrador': 'DRAFT'
    };
    
    const apiStatus = statusMap[event.target.value];
    if (!apiStatus) return;

    try {
      // Mostrar confirmación si se está finalizando el caso
      if (apiStatus === 'FINALIZED') {
        if (!window.confirm('¿Estás seguro de que deseas finalizar este caso? Una vez finalizado, solo será visible en el historial.')) {
          return;
        }
      }

      // Llamar a la función de actualización y esperar a que termine
      await onStatusChange(apiStatus);
      
      // Solo mostrar el mensaje después de que la actualización fue exitosa
      const messages = {
        'IN_PROGRESS': 'Caso marcado como en curso',
        'PENDING': 'Caso marcado como pendiente',
        'FINALIZED': 'Caso finalizado y movido al historial',
        'DRAFT': 'Caso guardado como borrador'
      };
      toast.success(messages[apiStatus] || 'Estado actualizado correctamente');

    } catch (error) {
      console.error('Error al cambiar el estado:', error);
      // No mostrar toast aquí, ya se mostrará en el manejador de errores del hook
    }
  };
  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    if (typeof status !== 'string') return 'bg-gray-700 text-gray-300';
    
    const statusColor = {
      'Finalizado': 'bg-green-600 text-white',
      'FINALIZED': 'bg-green-600 text-white',
      'Pendiente': 'bg-amber-500 text-white',
      'PENDING': 'bg-amber-500 text-white',
      'En curso': 'bg-blue-600 text-white',
      'IN_PROGRESS': 'bg-blue-600 text-white',
      'Borrador': 'bg-gray-600 text-white',
      'DRAFT': 'bg-gray-600 text-white'
    };
    
    return statusColor[status] || 'bg-gray-700 text-gray-300';
  };

  // Determinar el estado actual del caso
  const status = getDisplayStatus(caseData.status);

  // Si estamos en modo edición, mostramos el formulario de edición
  if (isEditing) {
    return (
      <div className="bg-dark-lighter rounded-lg p-6">
        <EditCaseForm 
          caseData={caseData} 
          onCancel={cancelEditing} 
        />
      </div>
    );
  }

  return (
    <div className="bg-dark-lighter rounded-lg p-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">{caseData.subjectMatter || 'Caso sin título'}</h1>
          <p className="text-gray-400">
            Comenzó el {formatDate(caseData.createdAt)}
          </p>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            onClick={startEditing}
            className="btn-secondary py-2 px-3 flex items-center gap-1"
            title="Editar caso"
          >
            <FiEdit className="w-4 h-4" />
            <span className="hidden sm:inline">Editar</span>
          </button>
            {isConfirmingDelete ? (
            <div className="flex space-x-2">
              <button
                onClick={cancelDelete}
                className="btn py-2 px-3 bg-gray-700 text-white"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="btn py-2 px-3 bg-red-600 text-white flex items-center gap-1"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                    Eliminando...
                  </>
                ) : (
                  'Confirmar'
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={handleDelete}
              className="btn py-2 px-3 bg-red-900 text-red-300 hover:bg-red-800 flex items-center gap-1"
              title="Eliminar caso"
            >
              <FiTrash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Eliminar</span>
            </button>
          )}
          
          <button
            className="btn-primary py-2 px-3 flex items-center gap-1"
            title="Abrir chat"
          >
            <FiMessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Chat</span>
          </button>
        </div>
      </div>
      
      {/* Detalles del caso */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-3 text-white">Detalles del procedimiento</h2>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-gray-400">Tipo de procedimiento</td>
                <td className="py-2 text-white">{caseData.proceedingType?.description || 'No especificado'}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-gray-400">Materia legal</td>
                <td className="py-2 text-white">{caseData.subjectMatter || 'No especificado'}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-gray-400">Estado</td>
                <td className="py-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusColor(status)}`}>
                      {status}
                    </span>
                      {/* Selector para cambiar estado */}                    <div className="relative">
                      <select
                        value={getDisplayStatus(caseData.status)}
                        onChange={handleStatusChange}
                        className="bg-gray-700 text-white border-none rounded-md py-1 px-2 text-sm appearance-none cursor-pointer pr-8 hover:bg-gray-600 transition-colors"
                      >
                        <option value="En curso">En curso</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Borrador">Borrador</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              {caseData.institution && (
                <tr className="border-b border-gray-700">
                  <td className="py-2 text-gray-400">Tribunal</td>
                  <td className="py-2 text-white">{caseData.institution}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-3 text-white">Partes involucradas</h2>
          
          {/* Demandantes */}
          {caseData.plaintiffs && caseData.plaintiffs.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium text-white">Demandante(s)</h3>
              {caseData.plaintiffs.map((plaintiff, index) => (
                <div key={index} className="mb-2">
                  <p className="text-gray-300">{plaintiff.fullName}</p>
                  <p className="text-gray-400 text-xs">RUT: {plaintiff.idNumber}</p>
                  <p className="text-gray-400 text-xs">Dirección: {plaintiff.address}</p>
                </div>
              ))}
            </div>
          )}
          
          {/* Demandados */}
          {caseData.defendants && caseData.defendants.length > 0 && (
            <div>
              <h3 className="font-medium text-white">Demandado(s)</h3>
              {caseData.defendants.map((defendant, index) => (
                <div key={index} className="mb-2">
                  <p className="text-gray-300">{defendant.fullName}</p>
                  <p className="text-gray-400 text-xs">RUT: {defendant.idNumber}</p>
                  <p className="text-gray-400 text-xs">Dirección: {defendant.address}</p>
                </div>
              ))}
            </div>
          )}
          
          {/* Abogado */}
          {caseData.attorneyOfRecord && (
            <div className="mt-4">
              <h3 className="font-medium text-white">Abogado patrocinante</h3>
              <p className="text-gray-300">{caseData.attorneyOfRecord.fullName}</p>
              <p className="text-gray-400 text-xs">RUT: {caseData.attorneyOfRecord.idNumber}</p>
            </div>
          )}
          
          {/* Representante */}
          {caseData.representative && (
            <div className="mt-4">
              <h3 className="font-medium text-white">Representante legal</h3>
              <p className="text-gray-300">{caseData.representative.fullName}</p>
              <p className="text-gray-400 text-xs">RUT: {caseData.representative.idNumber}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Peticiones al tribunal */}
      {caseData.claims && caseData.claims.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-white">Peticiones al tribunal</h2>
          <ul className="bg-dark p-4 rounded-md border border-gray-700 list-disc list-inside">
            {caseData.claims.map((claim, index) => (
              <li key={index} className="text-gray-300 mb-1">{claim}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Descripción del caso */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-white">Descripción del caso (relato)</h2>
        <div className="bg-dark p-4 rounded-md border border-gray-700">
          <p className="text-gray-300 whitespace-pre-wrap">{caseData.narrative || 'No hay descripción disponible'}</p>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;