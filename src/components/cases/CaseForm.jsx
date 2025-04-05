import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { FiSave, FiFileText } from 'react-icons/fi';
import { useMutation } from '@tanstack/react-query';
import { createCase } from '@/lib/api';

// Esquema de validación para el formulario de caso
const caseSchema = z.object({
  procedureType: z.string().min(1, 'Seleccione un tipo de procedimiento'),
  legalMatter: z.string().min(1, 'Seleccione una materia legal'),
  
  // Información del demandante
  plaintiffName: z.string().min(3, 'Nombre completo requerido'),
  plaintiffId: z.string().min(3, 'RUT requerido'),
  plaintiffAddress: z.string().min(5, 'Dirección requerida'),
  
  // Información del demandado
  defendantName: z.string().min(3, 'Nombre completo requerido'),
  defendantId: z.string().min(3, 'RUT requerido'),
  defendantAddress: z.string().min(5, 'Dirección requerida'),
  
  // Descripción del caso
  caseDescription: z.string().min(20, 'La descripción debe tener al menos 20 caracteres')
});

const CaseForm = () => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      procedureType: '',
      legalMatter: '',
      plaintiffName: '',
      plaintiffId: '',
      plaintiffAddress: '',
      defendantName: '',
      defendantId: '',
      defendantAddress: '',
      caseDescription: ''
    }
  });

  // Mutación para crear caso
  const createCaseMutation = useMutation({
    mutationFn: createCase,
    onSuccess: (data) => {
      toast.success('Caso creado exitosamente');
      router.push(`/cases/${data.id}`);
    },
    onError: (error) => {
      toast.error(`Error al crear el caso: ${error.message}`);
      setSaving(false);
    }
  });

  // Opciones para los selectores
  const procedureTypes = [
    { value: 'juicio-ordinario', label: 'Juicio ordinario' },
    { value: 'juicio-ejecutivo', label: 'Juicio ejecutivo' },
    { value: 'procedimiento-sumario', label: 'Procedimiento sumario' },
    { value: 'medida-precautoria', label: 'Medida precautoria' }
  ];

  const legalMatters = [
    { value: 'cobro-deuda', label: 'Cobro de deuda' },
    { value: 'incumplimiento-contrato', label: 'Incumplimiento de contrato' },
    { value: 'arrendamiento', label: 'Arrendamiento' },
    { value: 'responsabilidad-civil', label: 'Responsabilidad civil' },
    { value: 'derecho-consumidor', label: 'Derecho del consumidor' }
  ];

  // Manejar el envío del formulario
  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await createCaseMutation.mutateAsync(data);
    } catch (error) {
      // Error manejado por la mutación
    }
  };

  // Función para guardar como borrador
  const saveDraft = () => {
    toast.info('Borrador guardado');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Nuevo caso</h2>
      
      {/* Tipo de procedimiento y materia legal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-gray-300">Tipo de procedimiento</label>
          <select 
            {...register('procedureType')}
            className={`input-field ${errors.procedureType ? 'border-red-500' : ''}`}
          >
            <option value="">Seleccione una opción</option>
            {procedureTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.procedureType && (
            <p className="mt-1 text-sm text-red-500">{errors.procedureType.message}</p>
          )}
        </div>
        
        <div>
          <label className="block mb-1 text-gray-300">Materia legal</label>
          <select 
            {...register('legalMatter')}
            className={`input-field ${errors.legalMatter ? 'border-red-500' : ''}`}
          >
            <option value="">Seleccione una opción</option>
            {legalMatters.map(matter => (
              <option key={matter.value} value={matter.value}>
                {matter.label}
              </option>
            ))}
          </select>
          {errors.legalMatter && (
            <p className="mt-1 text-sm text-red-500">{errors.legalMatter.message}</p>
          )}
        </div>
      </div>
      
      {/* Información del demandante */}
      <div>
        <h3 className="text-md font-semibold mb-3 text-gray-200">Información del demandante</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-gray-300">Nombre Completo</label>
            <input 
              type="text" 
              {...register('plaintiffName')}
              placeholder="Ingresa el nombre completo"
              className={`input-field ${errors.plaintiffName ? 'border-red-500' : ''}`}
            />
            {errors.plaintiffName && (
              <p className="mt-1 text-sm text-red-500">{errors.plaintiffName.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-300">RUT</label>
            <input 
              type="text" 
              {...register('plaintiffId')}
              placeholder="Ingresa el RUT"
              className={`input-field ${errors.plaintiffId ? 'border-red-500' : ''}`}
            />
            {errors.plaintiffId && (
              <p className="mt-1 text-sm text-red-500">{errors.plaintiffId.message}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block mb-1 text-gray-300">Dirección</label>
          <input 
            type="text" 
            {...register('plaintiffAddress')}
            placeholder="Ingresa la dirección"
            className={`input-field ${errors.plaintiffAddress ? 'border-red-500' : ''}`}
          />
          {errors.plaintiffAddress && (
            <p className="mt-1 text-sm text-red-500">{errors.plaintiffAddress.message}</p>
          )}
        </div>
      </div>
      
      {/* Información del demandado */}
      <div>
        <h3 className="text-md font-semibold mb-3 text-gray-200">Información demandad@</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-gray-300">Nombre Completo</label>
            <input 
              type="text" 
              {...register('defendantName')}
              placeholder="Ingresa el nombre completo"
              className={`input-field ${errors.defendantName ? 'border-red-500' : ''}`}
            />
            {errors.defendantName && (
              <p className="mt-1 text-sm text-red-500">{errors.defendantName.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-300">RUT</label>
            <input 
              type="text" 
              {...register('defendantId')}
              placeholder="Ingresa el RUT"
              className={`input-field ${errors.defendantId ? 'border-red-500' : ''}`}
            />
            {errors.defendantId && (
              <p className="mt-1 text-sm text-red-500">{errors.defendantId.message}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block mb-1 text-gray-300">Dirección</label>
          <input 
            type="text" 
            {...register('defendantAddress')}
            placeholder="Ingresa la dirección"
            className={`input-field ${errors.defendantAddress ? 'border-red-500' : ''}`}
          />
          {errors.defendantAddress && (
            <p className="mt-1 text-sm text-red-500">{errors.defendantAddress.message}</p>
          )}
        </div>
      </div>
      
      {/* Descripción del caso */}
      <div>
        <label className="block mb-1 text-gray-300">Descripción del caso</label>
        <textarea 
          {...register('caseDescription')}
          placeholder="Ingrese de forma detallada la descripción del caso"
          rows={5}
          className={`input-field ${errors.caseDescription ? 'border-red-500' : ''}`}
        />
        {errors.caseDescription && (
          <p className="mt-1 text-sm text-red-500">{errors.caseDescription.message}</p>
        )}
      </div>
      
      {/* Botones de acción */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={saveDraft}
          className="btn-secondary flex items-center gap-2"
        >
          <FiSave className="w-4 h-4" />
          Guardar borrador
        </button>
        <button
          type="submit"
          disabled={saving}
          className="btn-primary flex items-center gap-2"
        >
          <FiFileText className="w-4 h-4" />
          {saving ? 'Generando...' : 'Generar demanda'}
        </button>
      </div>
    </form>
  );
};

export default CaseForm;
