import React from "react";
import { usePage } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';

type PageProps = {
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    roles: string[];
  } | null;
  company: {
    id: number;
    name: string;
    nit: string;
    responsible_name: string | null;
    responsible_email: string | null;
    responsible_phone: string | null;
    responsible_position: string | null;
    address: string | null;
    logo_url: string | null;
    images: Array<{
      id: number;
      url: string;
      title: string | null;
      description: string | null;
      type: string;
      order: number;
    }>;
  } | null;
  student: {
    id: number;
    is_leader: boolean;
  } | null;
};

const MiCuenta = () => {
  const { props } = usePage<PageProps>();
  const { user, company, student } = props;

  return (
    <MainLayout title="Mi Cuenta - IN-NOVA" description="Gestiona tu perfil y configuración">
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-200">
        {/* Encabezado */}
        <header className="text-center py-10 text-white">
          <h1 className="text-4xl font-bold">Mi cuenta</h1>
          <p className="mt-2">Home / Mi cuenta</p>
        </header>

        {/* Contenedor principal */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 relative">
          {/* Imagen de portada */}
          <div className="h-40 bg-gray-100 rounded-xl flex items-center justify-center">
            <span className="text-gray-400 text-2xl">+</span>
          </div>

          {/* Perfil */}
          <div className="flex flex-col items-center -mt-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center">
              <span className="text-gray-400 text-3xl">👤</span>
            </div>
            <h2 className="mt-2 text-xl font-semibold">{user?.name}</h2>
          </div>





          {/* Información */}
          <div className="mt-4">
            <div>
              <p className="mb-2">
                <strong>Dirección de correo electrónico:</strong>{" "}{user?.email}
              </p>
              <p className="mb-2">
                <strong>Fecha de registro:</strong> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : ''}
              </p>
              {user?.roles && user.roles.length > 0 && (
                <p className="mb-2">
                  <strong>Roles:</strong> {user.roles.join(', ')}
                </p>
              )}
            </div>
            {company && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Información de la empresa</h3>
                <p className="mb-1"><strong>Nombre:</strong> {company.name}</p>
                <p className="mb-1"><strong>NIT:</strong> {company.nit}</p>
                {company.address && <p className="mb-1"><strong>Dirección:</strong> {company.address}</p>}
                {company.responsible_name && <p className="mb-1"><strong>Responsable:</strong> {company.responsible_name}</p>}
                {company.responsible_email && <p className="mb-1"><strong>Email responsable:</strong> {company.responsible_email}</p>}
                {company.responsible_phone && <p className="mb-1"><strong>Teléfono responsable:</strong> {company.responsible_phone}</p>}
                {company.responsible_position && <p className="mb-1"><strong>Cargo:</strong> {company.responsible_position}</p>}
                {company.logo_url && (
                  <div className="mt-3">
                    <img src={company.logo_url} alt="Logo de la empresa" className="h-16 object-contain" />
                  </div>
                )}
                {company.images && company.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {company.images.map((img) => (
                      <div key={img.id} className="border rounded-md p-2">
                        <img src={img.url} alt={img.title ?? 'Imagen'} className="w-full h-24 object-cover rounded" />
                        <div className="mt-1 text-sm text-gray-600">
                          {img.title && <div className="font-medium">{img.title}</div>}
                          {img.description && <div>{img.description}</div>}
                          <div>{img.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {student && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Información de estudiante</h3>
                <p className="mb-1"><strong>Líder de equipo:</strong> {student.is_leader ? 'Sí' : 'No'}</p>
              </div>
            )}

          </div>


        </div>
      </div>
    </MainLayout>
  );
};

export default MiCuenta;
