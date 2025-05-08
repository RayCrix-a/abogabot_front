import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { FiSave, FiFileText } from 'react-icons/fi';
import { useMutation } from '@tanstack/react-query';
import { useCases } from '@/hooks/useCases';
import { useParticipants } from '@/hooks/useParticipants';
import { useProceedingTypes } from '@/hooks/useProceedingTypes';

// Esquema de validación para el formulario de caso
const caseSchema = z.object({
  proceedingType: z.string().min(1, 'Seleccione un tipo de procedimiento'),
  legalMatter: z.string().min(1, 'Seleccione una materia legal'),
  
  // Información del demandante
  plaintiffId: z.string().min(3, 'RUT requerido'),
  plaintiffName: z.string().min(3, 'Nombre completo requerido'),
  plaintiffAddress: z.string().min(5, 'Dirección requerida'),
  
  // Información del demandado
  defendantId: z.string().min(3, 'RUT requerido'),
  defendantName: z.string().min(3, 'Nombre completo requerido'),
  defendantAddress: z.string().min(5, 'Dirección requerida'),
  
  // Información del abogado (opcional)
  attorneyId: z.string().optional(),
  attorneyName: z.string().optional(),
  attorneyAddress: z.string().optional(),
  
  // Información del representante (opcional)
  representativeId: z.string().optional(),
  representativeName: z.string().optional(),
  representativeAddress: z.string().optional(),
  
  // Tribunal
  institution: z.string().min(1, 'Tribunal requerido'),
  
  // Descripción del caso
  description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  
  // Peticiones al tribunal
  claims: z.array(z.string()).optional()
});

const CaseForm = () => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  
  // Hooks para acceder a datos de la API
  const { createCase } = useCases();
  const { 
    plaintiffs, defendants, lawyers, representatives,
    createPlaintiff, createDefendant, createLawyer, createRepresentative,
    isLoadingPlaintiffs, isLoadingDefendants, isLoadingLawyers, isLoadingRepresentatives 
  } = useParticipants();
  const { proceedingTypeOptions, isLoading: isLoadingProceedingTypes } = useProceedingTypes();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      proceedingType: '',
      legalMatter: '',
      plaintiffId: '',
      plaintiffName: '',
      plaintiffAddress: '',
      defendantId: '',
      defendantName: '',
      defendantAddress: '',
      attorneyId: '',
      attorneyName: '',
      attorneyAddress: '',
      representativeId: '',
      representativeName: '',
      representativeAddress: '',
      institution: 'S.J.L. EN LO CIVIL',
      description: '',
      claims: ['DEMANDA CIVIL']
    }
  });

  // Valores observados para controlar la lógica condicional
  const watchedPlaintiffId = watch('plaintiffId');
  const watchedDefendantId = watch('defendantId');
  const watchedAttorneyId = watch('attorneyId');
  const watchedRepresentativeId = watch('representativeId');

  // Efectos para autocompletar datos de participantes existentes
  useEffect(() => {
    if (watchedPlaintiffId && plaintiffs) {
      console.log('Buscando demandante con RUT:', watchedPlaintiffId);
      const plaintiff = plaintiffs.find(p => p.idNumber === watchedPlaintiffId);
      console.log('Demandante encontrado:', plaintiff);
      if (plaintiff) {
        setValue('plaintiffName', plaintiff.fullName);
        setValue('plaintiffAddress', plaintiff.address || '');
      }
    }
  }, [watchedPlaintiffId, plaintiffs, setValue]);

  useEffect(() => {
    if (watchedDefendantId && defendants) {
      console.log('Buscando demandado con RUT:', watchedDefendantId);
      const defendant = defendants.find(d => d.idNumber === watchedDefendantId);
      console.log('Demandado encontrado:', defendant);
      if (defendant) {
        setValue('defendantName', defendant.fullName);
        setValue('defendantAddress', defendant.address || '');
      }
    }
  }, [watchedDefendantId, defendants, setValue]);

  useEffect(() => {
    if (watchedAttorneyId && lawyers) {
      console.log('Buscando abogado con RUT:', watchedAttorneyId);
      const lawyer = lawyers.find(l => l.idNumber === watchedAttorneyId);
      console.log('Abogado encontrado:', lawyer);
      if (lawyer) {
        setValue('attorneyName', lawyer.fullName);
        setValue('attorneyAddress', lawyer.address || '');
      }
    }
  }, [watchedAttorneyId, lawyers, setValue]);

  useEffect(() => {
    if (watchedRepresentativeId && representatives) {
      console.log('Buscando representante con RUT:', watchedRepresentativeId);
      const representative = representatives.find(r => r.idNumber === watchedRepresentativeId);
      console.log('Representante encontrado:', representative);
      if (representative) {
        setValue('representativeName', representative.fullName);
        setValue('representativeAddress', representative.address || '');
      }
    }
  }, [watchedRepresentativeId, representatives, setValue]);

  // Opciones para los selectores
  const legalMatters = [
    { value: 'Cobro de deuda', label: 'Cobro de deuda' },
    { value: 'Incumplimiento de contrato', label: 'Incumplimiento de contrato' },
    { value: 'Arrendamiento', label: 'Arrendamiento' },
    { value: 'Responsabilidad civil', label: 'Responsabilidad civil' },
    { value: 'Derecho del consumidor', label: 'Derecho del consumidor' },
    { value: 'Prescripción extintiva', label: 'Prescripción extintiva' },
    { value: 'Indemnización de perjuicios', label: 'Indemnización de perjuicios' }
  ];

  // Instituciones/Tribunales
  const institutions = [
    { value: 'S.J.L. EN LO CIVIL', label: 'Juzgado de Letras en lo Civil' },
    { value: 'CORTE DE APELACIONES', label: 'Corte de Apelaciones' },
    { value: 'JUZGADO DE FAMILIA', label: 'Juzgado de Familia' },
    { value: 'JUZGADO DE GARANTÍA', label: 'Juzgado de Garantía' },
    { value: 'TRIBUNAL ORAL EN LO PENAL', label: 'Tribunal Oral en lo Penal' }
  ];

  // Peticiones comunes para el tribunal
  const commonClaims = [
    'DEMANDA CIVIL',
    'DEMANDA EJECUTIVA Y MANDAMIENTO DE EJECUCIÓN Y EMBARGO',
    'SEÑALA BIENES PARA EMBARGO Y DEPOSITARIO PROVISIONAL',
    'ACOMPAÑA DOCUMENTOS, CON CITACIÓN',
    'FORMACIÓN DE CUADERNO SEPARADO',
    'PATROCINIO Y PODER',
    'FORMA DE NOTIFICACIÓN ELECTRÓNICA'
  ];

  // Mutaciones para crear participantes si no existen
  const createPlaintiffMutation = useMutation({
    mutationFn: (data) => createPlaintiff(data),
    onSuccess: () => {
      toast.success('Demandante creado exitosamente');
    }
  });

  const createDefendantMutation = useMutation({
    mutationFn: (data) => createDefendant(data),
    onSuccess: () => {
      toast.success('Demandado creado exitosamente');
    }
  });

  const onSubmit = async (data) => {
    setSaving(true);
    
    try {
      // Crear participantes si no existen
      if (!plaintiffs?.some(p => p.idNumber === data.plaintiffId)) {
        await createPlaintiffMutation.mutateAsync({
          idNumber: data.plaintiffId,
          fullName: data.plaintiffName,
          address: data.plaintiffAddress
        });
      }
      
      if (!defendants?.some(d => d.idNumber === data.defendantId)) {
        await createDefendantMutation.mutateAsync({
          idNumber: data.defendantId,
          fullName: data.defendantName,
          address: data.defendantAddress
        });
      }
      
      // Opcional: crear abogado y representante si se proporcionaron
      if (data.attorneyId && data.attorneyName && !lawyers?.some(l => l.idNumber === data.attorneyId)) {
        await createLawyer({
          idNumber: data.attorneyId,
          fullName: data.attorneyName,
          address: data.attorneyAddress || ''
        });
      }
      
      if (data.representativeId && data.representativeName && !representatives?.some(r => r.idNumber === data.representativeId)) {
        await createRepresentative({
          idNumber: data.representativeId,
          fullName: data.representativeName,
          address: data.representativeAddress || ''
        });
      }
      
      // Crear la demanda usando createLawsuit del hook
      await createCase(data);
      router.push('/dashboard');
    } catch (error) {
      toast.error(`Error al crear el caso: ${error.message}`);
      setSaving(false);
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
            {...register('proceedingType')}
            className={`input-field ${errors.proceedingType ? 'border-red-500' : ''}`}
            disabled={isLoadingProceedingTypes}
          >
            <option value="">Seleccione una opción</option>
            {proceedingTypeOptions.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.proceedingType && (
            <p className="mt-1 text-sm text-red-500">{errors.proceedingType.message}</p>
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
            <label className="block mb-1 text-gray-300">RUT</label>
            <input 
              type="text" 
              {...register('plaintiffId')}
              placeholder="Ingresa el RUT"
              className={`input-field ${errors.plaintiffId ? 'border-red-500' : ''}`}
              list="plaintiff-list"
            />
            <datalist id="plaintiff-list">
              {plaintiffs?.map(plaintiff => (
                <option key={plaintiff.id} value={plaintiff.idNumber} />
              ))}
            </datalist>
            {errors.plaintiffId && (
              <p className="mt-1 text-sm text-red-500">{errors.plaintiffId.message}</p>
            )}
          </div>
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
            <label className="block mb-1 text-gray-300">RUT</label>
            <input 
              type="text" 
              {...register('defendantId')}
              placeholder="Ingresa el RUT"
              className={`input-field ${errors.defendantId ? 'border-red-500' : ''}`}
              list="defendant-list"
            />
            <datalist id="defendant-list">
              {defendants?.map(defendant => (
                <option key={defendant.id} value={defendant.idNumber} />
              ))}
            </datalist>
            {errors.defendantId && (
              <p className="mt-1 text-sm text-red-500">{errors.defendantId.message}</p>
            )}
          </div>
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

      {/* Información del abogado (opcional) */}
      <div>
        <h3 className="text-md font-semibold mb-3 text-gray-200">Abogado Patrocinante (opcional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-gray-300">RUT</label>
            <input 
              type="text" 
              {...register('attorneyId')}
              placeholder="Ingresa el RUT"
              className="input-field"
              list="lawyer-list"
            />
            <datalist id="lawyer-list">
              {lawyers?.map(lawyer => (
                <option key={lawyer.id} value={lawyer.idNumber} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Nombre Completo</label>
            <input 
              type="text" 
              {...register('attorneyName')}
              placeholder="Ingresa el nombre completo"
              className="input-field"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-gray-300">Dirección</label>
          <input 
            type="text" 
            {...register('attorneyAddress')}
            placeholder="Ingresa la dirección"
            className="input-field"
          />
        </div>
      </div>

      {/* Información del representante (opcional) */}
      <div>
        <h3 className="text-md font-semibold mb-3 text-gray-200">Representante Legal (opcional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-gray-300">RUT</label>
            <input 
              type="text" 
              {...register('representativeId')}
              placeholder="Ingresa el RUT"
              className="input-field"
              list="representative-list"
            />
            <datalist id="representative-list">
              {representatives?.map(rep => (
                <option key={rep.id} value={rep.idNumber} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Nombre Completo</label>
            <input 
              type="text" 
              {...register('representativeName')}
              placeholder="Ingresa el nombre completo"
              className="input-field"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-gray-300">Dirección</label>
          <input 
            type="text" 
            {...register('representativeAddress')}
            placeholder="Ingresa la dirección"
            className="input-field"
          />
        </div>
      </div>

      {/* Tribunal */}
      <div>
        <label className="block mb-1 text-gray-300">Tribunal</label>
        <select 
          {...register('institution')}
          className={`input-field ${errors.institution ? 'border-red-500' : ''}`}
        >
          {institutions.map(inst => (
            <option key={inst.value} value={inst.value}>
              {inst.label}
            </option>
          ))}
        </select>
        {errors.institution && (
          <p className="mt-1 text-sm text-red-500">{errors.institution.message}</p>
        )}
      </div>
      
      {/* Descripción del caso */}
      <div>
        <label className="block mb-1 text-gray-300">Descripción del caso</label>
        <textarea 
          {...register('description')}
          placeholder="Ingrese de forma detallada la descripción del caso"
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