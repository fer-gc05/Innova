import { Link, useForm } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    username: string | null;
    role: string;
}

interface Props {
    roles: Role[];
    user: User;
}

export default function EditUser({ roles, user }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        username: user.username || '',
        role: user.role || '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    const getRoleLabel = (name: string) => {
        switch (name) {
            case 'admin':
                return 'Administrador';
            case 'businessman':
                return 'Empresario';
            case 'student':
                return 'Estudiante';
            default:
                return name;
        }
    };

    return (
        <MainLayout title="Editar Usuario">
            <div className="flex items-center justify-between mb-10 mt-15">
                <div className="ml-20">
                    <h1 className="text-2xl font-semibold text-gray-900">Editar Usuario</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Modifica los datos del usuario seleccionado
                    </p>
                </div>
                <div className="flex items-center space-x-3 mr-15">
                    <Button variant="outline" asChild>
                        <Link href="/admin/dashboard">Panel Admin</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/admin/users">Volver</Link>
                    </Button>
                </div>
            </div>

            <Card className="max-w-2xl mx-auto p-6 mb-20">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="name">Nombre completo *</Label>
                            <p className="text-xs text-gray-500 mb-2">
                                Modifica el nombre completo del usuario como aparecerá en la plataforma
                            </p>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="email">Email *</Label>
                            <p className="text-xs text-gray-500 mb-2">
                                Usa un correo electrónico válido para que el usuario pueda acceder
                            </p>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="username">Nombre de usuario</Label>
                            <p className="text-xs text-gray-500 mb-2">
                                Modifica el nombre de usuario único para que acceda a la plataforma
                            </p>
                            <input
                                id="username"
                                type="text"
                                value={data.username ?? ''}
                                onChange={(e) => setData('username', e.target.value)}
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                                placeholder="Opcional"
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="role">Rol *</Label>
                            <p className="text-xs text-gray-500 mb-2">
                                Cambia el rol que determinará los permisos del usuario
                            </p>
                            <select
                                id="role"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                required
                            >
                                <option value="">Seleccionar rol</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.name}>
                                        {getRoleLabel(role.name)}
                                    </option>
                                ))}
                            </select>
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password">Nueva contraseña</Label>
                            <p className="text-xs text-gray-500 mb-2">
                                Deja vacío si no deseas cambiar la contraseña actual
                            </p>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                                placeholder="Déjalo vacío si no deseas cambiarla"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                            <p className="text-xs text-gray-500 mb-2">
                                Repite la nueva contraseña para confirmar el cambio
                            </p>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                                placeholder="Déjalo vacío si no deseas cambiarla"
                            />
                            {errors.password_confirmation && (
                                <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
                            )}
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline" asChild>
                                <Link href="/admin/users">Cancelar</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Guardando...' : 'Guardar cambios'}
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
        </MainLayout>
    );
}
