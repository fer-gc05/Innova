import React, { useState } from "react";
import { Settings, LogOut, Edit } from "lucide-react";
import MainLayout from '@/layouts/main-layout';

const MiCuenta = () => {
  const [activeTab, setActiveTab] = useState("informacion");

  const tabs = [
    { id: "informacion", label: "Información" },
    { id: "entradas", label: "Entradas" },
    { id: "comentarios", label: "Comentarios" },
  ];

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
            <h2 className="mt-2 text-xl font-semibold">Sebastian Lemus</h2>
          </div>

          {/* Menú de configuración */}
          <div className="absolute top-6 right-6">
            <div className="relative group">
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <Settings className="w-5 h-5" />
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg hidden group-hover:block">
                <button className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                  <Edit className="w-4 h-4 mr-2" /> Editar perfil
                </button>
                <button className="w-full px-4 py-2 text-sm hover:bg-gray-100">
                  Mi cuenta
                </button>
                <button className="w-full flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                  <LogOut className="w-4 h-4 mr-2" /> Salir
                </button>
                <button className="w-full px-4 py-2 text-sm hover:bg-gray-100">
                  Cancelar
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenido de la pestaña */}
          <div className="mt-4">
            {activeTab === "informacion" && (
              <div>
                <p className="mb-2">
                  <strong>Dirección de correo electrónico:</strong>{" "}
                  sebastian@correo.com
                </p>
                <p className="mb-2">
                  <strong>Fecha de registro:</strong> Registrado el 24 de julio,
                  2025
                </p>
              </div>
            )}
            {activeTab === "entradas" && <p>No hay entradas todavía.</p>}
            {activeTab === "comentarios" && <p>No hay comentarios todavía.</p>}
          </div>

          {/* Botones de acción */}
          <div className="mt-6 flex justify-center gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Publicar Reto
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Estudiantes Inscritos
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800">
              Administrador
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MiCuenta;
