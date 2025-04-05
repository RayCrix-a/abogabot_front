import MainLayout from '@/components/layout/MainLayout';
import CaseForm from '@/components/cases/CaseForm';

export default function NewCase() {
  return (
    <MainLayout title="Nuevo Caso" description="Crear un nuevo caso en AbogaBot">
      <div className="max-w-4xl mx-auto bg-dark-lighter rounded-lg p-6">
        <CaseForm />
      </div>
    </MainLayout>
  );
}
