import React from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';
import { Challenge, Company, Student } from '@/types';

interface Props {
  challenge: Challenge & { students?: Student[]; companies?: Company[] };
}

export default function AdminChallengeParticipants({ challenge }: Props) {
  const students = challenge.students || [];
  const companies = challenge.companies || [];

  return (
    <MainLayout title={`Participantes - ${challenge.name}`} description="Empresas y estudiantes vinculados al reto">
      <div className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Participantes</h1>
              <p className="text-sm text-gray-500">Reto: {challenge.name}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/admin/dashboard" className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700">Panel Admin</Link>
              <Link href="/admin/challenges" className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700">Volver</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="font-semibold">Empresas ({companies.length})</h2>
              </div>
              <ul className="divide-y">
                {companies.length === 0 && (
                  <li className="px-6 py-4 text-sm text-gray-500">Sin empresas registradas</li>
                )}
                {companies.map((c) => (
                  <li key={c.id} className="px-6 py-4">
                    <div className="font-medium text-gray-900">{c.name}</div>
                    <div className="text-sm text-gray-600">{c.responsible_email}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="font-semibold">Estudiantes ({students.length})</h2>
              </div>
              <ul className="divide-y">
                {students.length === 0 && (
                  <li className="px-6 py-4 text-sm text-gray-500">Sin estudiantes registrados</li>
                )}
                {students.map((s) => (
                  <li key={s.id} className="px-6 py-4">
                    <div className="font-medium text-gray-900">{s.user?.name || `Estudiante #${s.id}`}</div>
                    <div className="text-sm text-gray-600">{s.user?.email}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
