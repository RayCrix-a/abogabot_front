import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FiFileText, FiClock, FiUser } from 'react-icons/fi';

const CaseCard = ({ caseData }) => {
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
  };

  // Función para determinar el color de estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'Finalizado':
        return 'bg-green-600 text-white';
      case 'Pendiente':
        return 'bg-yellow-500 text-white';
      case 'En curso':
      default:
        return 'bg-blue-600 text-white';
    }
  };

  return (
    <Link href={`/cases/${caseData.id}`} className="block">
      <div className="bg-dark-lighter hover:bg-dark-light rounded-lg shadow-lg overflow-hidden transition-all duration-200 transform hover:-translate-y-1 border border-gray-800">
        {/* Barra superior de estado */}
        <div className={`h-2 w-full ${getStatusColor(caseData.status).split(' ')[0]}`}></div>
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-white text-lg truncate">{caseData.title}</h3>
            <span className={`ml-2 px-3 py-1 rounded-md text-xs font-medium flex-shrink-0 ${getStatusColor(caseData.status)}`}>
              {caseData.status}
            </span>
          </div>
          
          <p className="text-sm text-gray-400 mb-4 line-clamp-2 min-h-[40px]">
            {caseData.description}
          </p>
          
          <div className="border-t border-gray-700 pt-3 mt-2">
            <div className="flex flex-wrap gap-y-2 text-xs text-gray-400">
              <div className="flex items-center w-full">
                <FiFileText className="mr-2 text-primary" />
                <span className="mr-2 font-medium">Tipo:</span> {caseData.procedureType || caseData.type}
              </div>
              <div className="flex items-center w-full">
                <FiClock className="mr-2 text-primary" />
                <span className="mr-2 font-medium">Creado:</span> {formatDate(caseData.createdAt)}
              </div>
              <div className="flex items-center w-full">
                <FiUser className="mr-2 text-primary" />
                <span className="mr-2 font-medium">Partes:</span> {caseData.parties}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CaseCard;
