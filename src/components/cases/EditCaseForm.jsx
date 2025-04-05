import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { FiSave, FiX } from 'react-icons/fi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCase } from '@/lib/api';

// Esquema de validación para el formulario de edición de caso
const editCaseSchema = z.object({
  procedureType: z.string().min(1, 'Seleccione un tipo de procedimiento'),
  legalMatter: z.string().min(1, 'Seleccione una materia legal'),
  status: z.string().min(1, 'Seleccione un estado'),
  
  // Información del demandante
  plaintiffName: z.string().min(3, 'Nombre completo requerido'),
  plaintiffId: z.string().min(3, 'RUT requerido'),
  plaintiffAddress: z.string().min(5, 'Dirección requerida'),
  
  // Información del demandado
  defendantName: z.string().min(3, 'Nombre completo requerido'),
  defendantId: z.string().min(3, 'RUT requerido'),
  defendantAddress: z.string().min(5, 'Dirección requerida'),
  
  // Descripción del caso
  description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres')
});

const EditCaseForm = ({ caseData, onCancel }) => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(editCaseSchema),
    defaultValues: {
      procedureType: caseData.procedureType || '',
      legalMatter: caseData.legalMatter || '',
      status: caseData.status || 'En curso',
      plaintiffName: caseData.plaintiffName || '',
      plaintiffId: caseData.plaintiffId || '',
      plaintiffAddress: caseData.plaintiffAddress || '',
      defendantName: caseData.defendantName || '',
      defendantId: caseData.defendantId || '',
      defendantAddress: caseData.defendantAddress || '',
      description: caseData.description || ''
    }
  });

  // Cargar datos iniciales cuando cambia caseData
  useEffect(() => {
    if (caseData) {
      reset({
        procedureType: caseData.procedureType || '',
        legalMatter: caseData.legalMatter || '',
        status: caseData.status || 'En curso',
        plaintiffName: caseData.plaintiffName || '',
        plaintiffId: caseData.plaintiffId || '',
        plaintiffAddress: caseData.plaintiffAddress || '',
        defendantName: caseData.defendantName || '',
        defendantId: caseData.defendantId || '',
        defendantAddress: caseData.defendantAddress || '',
        description: caseData.description || ''
      });
    }
  }, [caseData, reset]);

  // Mutación para actualizar caso
  const updateCaseMutation = useMutation({
    mutationFn: (data) => updateCase(caseData.id, data),
    onSuccess: () => {
      // Invalidar consultas para refrescar datos
      queryClient.invalidateQueries(['cases']);
      queryClient.invalidateQueries(['case', caseData.id]);
      
      toast.success('Caso actualizado exitosamente');
      
      // Cerrar el formulario de edición
      onCancel();
    },
    onError: (error) => {
      toast.error(`Error al actualizar el caso: ${error.message}`);
      setSaving(false);
    }
  });

  // Opciones para los selectores
  const procedureTypes = [
    { value: 'Juicio ordinario', label: 'Juicio ordinario' },
    { value: 'Juicio ejecutivo', label: 'Juicio ejecutivo' },
    { value: 'Procedimiento sumario', label: 'Procedimiento sumario' },
    { value: 'Medida precautoria', label: 'Medida precautoria' }
  ];

  const legalMatters = [
    { value: 'Cobro de deuda', label: 'Cobro de deuda' },
    { value: 'Incumplimiento de contrato', label: 'Incumplimiento de contrato' },
    { value: 'Arrendamiento', label: 'Arrendamiento' },
    { value: 'Responsabilidad civil', label: 'Responsabilidad civil' },
    { value: 'Derecho del consumidor', label: 'Derecho del consumidor' }
  ];

  const statusOptions = [
    { value: 'En curso', label: 'En curso' },
    { value: 'Pendiente', label: 'Pendiente' },
    { value: 'Finalizado', label: 'Finalizado' }
  ];

  // Manejar el envío del formulario
  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await updateCaseMutation.mutateAsync(data);
    } catch (error) {
      // Error manejado por la mutación
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Editar caso</h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-white"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
      
      {/* Tipo de procedimiento, materia legal y estado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        <div>
          <label className="block mb-1 text-gray-300">Estado del caso</label>
          <select 
            {...register('status')}
            className={`input-field ${errors.status ? 'border-red-500' : ''}`}
          >
            {statusOptions.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
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
          {...register('description')}
          rows={5}
          className={`input-field ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      
      {/* Botones de acción */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="btn-primary flex items-center gap-2"
        >
          <FiSave className="w-4 h-4" />
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  );
};

export default EditCaseForm;
