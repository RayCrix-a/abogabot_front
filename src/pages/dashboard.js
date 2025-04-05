import { useState, useEffect } from 'react';
import { FiPlus, FiFolder, FiClock, FiSearch, FiEdit, FiTrash2, FiFileText } from 'react-icons/fi';
import MainLayout from '@/components/layout/MainLayout';
import CaseCard from '@/components/cases/CaseCard';
import { useCases } from '@/hooks/useCases';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { cases, isLoadingCases } = useCases();
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const [recentActivities, setRecentActivities] = useState([]);

  // Filtrar casos activos (no finalizados)
  const activeCases = cases?.filter(c => c.status !== 'Finalizado') || [];

  // Obtener los 3 casos más recientes
  const recentCases = [...activeCases]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  // Filtrar casos según término de búsqueda
  const filteredCases = recentCases.filter(caseItem => 
    caseItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para formatear la fecha
  const formatActivityDate = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    
    const diffInMinutes = Math.floor((now - activityDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora mismo';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} minutos`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    
    return format(activityDate, "d 'de' MMMM", { locale: es });
  };

  // Generar actividades recientes basadas en los casos (simulación)
  useEffect(() => {
    if (cases) {
      const activities = [];
      
      // Añadir actividades de casos recientes
      cases.forEach(caseItem => {
        // Crear actividad de caso creado
        activities.push({
          id: `act-create-${caseItem.id}`,
          description: `Caso creado: ${caseItem.title}`,
          timestamp: caseItem.createdAt,
          icon: <FiFileText className="text-blue-500" />,
          type: 'create',
          caseId: caseItem.id
        });
        
        // Si tiene lastUpdated, añadir actividad de actualización
        if (caseItem.lastUpdated) {
          activities.push({
            id: `act-update-${caseItem.id}`,
            description: `Caso actualizado: ${caseItem.title}`,
            timestamp: caseItem.lastUpdated,
            icon: <FiEdit className="text-yellow-500" />,
            type: 'update',
            caseId: caseItem.id
          });
        }
        
        // Si tiene status finalizado, añadir actividad de finalización
        if (caseItem.status === 'Finalizado') {
          activities.push({
            id: `act-finish-${caseItem.id}`,
            description: `Caso finalizado: ${caseItem.title}`,
            timestamp: caseItem.lastUpdated || caseItem.createdAt,
            icon: <FiClock className="text-green-500" />,
            type: 'finish',
            caseId: caseItem.id
          });
        }
      });
      
      // Ordenar actividades por timestamp (más reciente primero)
      activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      // Tomar las 5 actividades más recientes
      setRecentActivities(activities.slice(0, 5));
    }
  }, [cases]);

  return (
    <MainLayout title="Dashboard" description="Gestione sus casos legales con AbogaBot">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-gray-400">
          Bienvenido {user?.name || ''} a AbogaBot, tu asistente legal con inteligencia artificial
        </p>
      </div>

      {/* Buscador y botón de nuevo caso */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Buscar casos recientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 w-full"
          />
        </div>
        
        <Link href="/cases/new">
          <button className="btn-primary flex items-center gap-2">
            <FiPlus className="w-5 h-5" />
            Nuevo Caso
          </button>
        </Link>
      </div>

      {/* Sección de casos recientes */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <FiFolder className="text-primary mr-2 w-5 h-5" />
          <h2 className="text-xl font-semibold text-white">Casos recientes</h2>
          <Link href="/cases" className="ml-auto text-primary text-sm hover:underline">
            Ver todos
          </Link>
        </div>
        
        {isLoadingCases ? (
          <div className="text-center py-6">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-gray-400">Cargando casos...</p>
          </div>
        ) : filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map(caseItem => (
              <CaseCard key={caseItem.id} caseData={caseItem} />
            ))}
          </div>
        ) : (
          <div className="bg-dark p-6 rounded-lg text-center">
            <p className="text-gray-400 mb-4">No se encontraron casos recientes</p>
            <Link href="/cases/new">
              <button className="btn-primary">Crear primer caso</button>
            </Link>
          </div>
        )}
      </section>

      {/* Sección de actividad reciente */}
      <section>
        <div className="flex items-center mb-4">
          <FiClock className="text-primary mr-2 w-5 h-5" />
          <h2 className="text-xl font-semibold text-white">Actividad reciente</h2>
        </div>
        
        <div className="bg-dark p-4 rounded-lg">
          {recentActivities.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="py-3 flex items-start">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.description}</p>
                    <p className="text-xs text-gray-400">{formatActivityDate(activity.timestamp)}</p>
                  </div>
                  <Link href={`/cases/${activity.caseId}`}>
                    <button className="text-xs text-primary hover:underline">
                      Ver caso
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-3">
              <p className="text-gray-400 text-sm">No hay actividad reciente</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
