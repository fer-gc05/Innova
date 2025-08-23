import { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';
import Alert from '@/components/Alert';
import React from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    username?: string;
    created_at: string;
    roles: Array<{
        name: string;
    }>;
    companies?: Array<{
        name: string;
    }>;
    students?: Array<{
        id: number;
    }>;
}

interface PaginatedData {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    users: PaginatedData;
    filters: {
        search: string;
        role: string;
    };
}

export default function UsersIndex({ users, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedRole, setSelectedRole] = useState(filters.role || '');
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const { props } = usePage<any>();

    // Manejar flash messages
    useEffect(() => {
        if (props.flash?.success) {
            setAlert({ type: 'success', message: props.flash.success });
        } else if (props.flash?.error) {
            setAlert({ type: 'error', message: props.flash.error });
        } else if (props.errors?.error) {
            setAlert({ type: 'error', message: props.errors.error });
        }
    }, [props.flash, props.errors]);

    const closeAlert = () => {
        setAlert(null);
    };

    const handleSearch = () => {
        router.get('/admin/users', {
            search: searchTerm,
            role: selectedRole
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            router.delete(`/admin/users/${id}`);
        }
    };

    const getRoleBadge = (roleName: string) => {
        const roleConfig = {
            admin: { label: 'Administrador', className: 'bg-red-100 text-red-800' },
            businessman: { label: 'Empresario', className: 'bg-blue-100 text-blue-800' },
            student: { label: 'Estudiante', className: 'bg-green-100 text-green-800' },
        };

        const config = roleConfig[roleName as keyof typeof roleConfig] || {
            label: roleName,
            className: 'bg-gray-100 text-gray-800'
        };

        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
            {config.label}
        </span>;
    };

    const handleViewUser = (user: User) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    return (
        <MainLayout title="Gestión de Usuarios - Panel Administrativo" description="Administra todos los usuarios del sistema">
            <div className="bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Alertas */}
                    {alert && (
                        <div className="mb-6">
                            <Alert
                                type={alert.type}
                                message={alert.message}
                                onClose={closeAlert}
                            />
                        </div>
                    )}

                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    Administra todos los usuarios del sistema IN-NOVA
                                </p>
                            </div>
                            <Link
                                href="/admin/users/create"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Crear Nuevo Usuario
                            </Link>
                        </div>
                    </div>

                    {/* Filtros */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Buscar
                                </label>
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre o email..."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rol
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                >
                                    <option value="">Todos los roles</option>
                                    <option value="admin">Administrador</option>
                                    <option value="businessman">Empresario</option>
                                    <option value="student">Estudiante</option>
                                </select>
                            </div>
                            <div className="flex items-end gap-2">
                                <button
                                    onClick={handleSearch}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Buscar
                                </button>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedRole('');
                                        router.get('/admin/users');
                                    }}
                                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Limpiar
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabla de Usuarios */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Usuarios ({users.total})
                            </h3>
                        </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Usuario
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Roles
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tipo
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Fecha de Registro
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.data.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {user.email}
                                                        </div>
                                                        {user.username && (
                                                            <div className="text-xs text-gray-400">
                                                                @{user.username}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-wrap gap-1">
                                                        {user.roles.map((role) => (
                                                            <div key={role.name}>
                                                                {getRoleBadge(role.name)}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {user.companies && user.companies.length > 0 && (
                                                        <div className="text-xs text-blue-600">
                                                            📈 {user.companies[0].name}
                                                        </div>
                                                    )}
                                                    {user.students && user.students.length > 0 && (
                                                        <div className="text-xs text-green-600">
                                                            🎓 Estudiante
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleViewUser(user)}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            Ver
                                                        </button>
                                                        <Link
                                                            href={`/admin/users/${user.id}/edit`}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Editar
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(user.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        {/* Paginación */}
                        {users.last_page > 1 && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Mostrando {((users.current_page - 1) * users.per_page) + 1} a {Math.min(users.current_page * users.per_page, users.total)} de {users.total} resultados
                                    </div>
                                    <div className="flex space-x-2">
                                        {users.current_page > 1 && (
                                            <Link
                                                href={`/admin/users?page=${users.current_page - 1}`}
                                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Anterior
                                            </Link>
                                        )}
                                        {users.current_page < users.last_page && (
                                            <Link
                                                href={`/admin/users?page=${users.current_page + 1}`}
                                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Siguiente
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Modal Ver Usuario */}
{showModal && selectedUser && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Fondo oscuro */}
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setShowModal(false)}
    />
    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold">Información del Usuario</h2>
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Contenido scrollable */}
      <div className="p-6 space-y-4 max-h-[70vh] overflow-auto">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{selectedUser.name}</h3>
          <p className="text-gray-600 mt-1">{selectedUser.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedUser.username && (
            <div>
              <div className="text-sm text-gray-500">Usuario</div>
              <div className="text-sm text-gray-900">@{selectedUser.username}</div>
            </div>
          )}
          <div>
            <div className="text-sm text-gray-500">Fecha de Registro</div>
            <div className="text-sm text-gray-900">
              {new Date(selectedUser.created_at).toLocaleDateString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Roles</div>
            <div className="text-sm text-gray-900">
              {selectedUser.roles.map((r) => r.name).join(", ")}
            </div>
          </div>
          {selectedUser.companies && selectedUser.companies.length > 0 && (
            <div>
              <div className="text-sm text-gray-500">Empresa</div>
              <div className="text-sm text-gray-900">
                {selectedUser.companies[0].name}
              </div>
            </div>
          )}
          {selectedUser.students && selectedUser.students.length > 0 && (
            <div>
              <div className="text-sm text-gray-500">Estudiante</div>
              <div className="text-sm text-gray-900">Sí</div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t flex justify-end gap-2">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
)}

        </MainLayout>
    );
}
