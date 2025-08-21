import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

interface Role {
    id: number;
    name: string;
}

interface Props {
    roles: Role[];
}

export default function CreateUser({ roles }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/users', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout
            title="Crear Usuario"
            renderHeader={() => (
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Crear Usuario</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Agrega un nuevo usuario a la plataforma
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/admin/users">Volver</Link>
                    </Button>
                </div>
            )}
        >
            <Card className="max-w-2xl mx-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="name">Nombre completo *</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="username">Nombre de usuario</Label>
                            <Input
                                id="username"
                                type="text"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                error={errors.username}
                                placeholder="Opcional"
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="role">Rol *</Label>
                            <Select
                                value={data.role}
                                onValueChange={(value) => setData('role', value)}
                                required
                            >
                                <option value="">Seleccionar rol</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.name}>
                                        {role.name === 'admin' && 'Administrador'}
                                        {role.name === 'businessman' && 'Empresario'}
                                        {role.name === 'student' && 'Estudiante'}
                                        {!['admin', 'businessman', 'student'].includes(role.name) && role.name}
                                    </option>
                                ))}
                            </Select>
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password">Contraseña *</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={errors.password}
                                required
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password_confirmation">Confirmar contraseña *</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                error={errors.password_confirmation}
                                required
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
                                {processing ? 'Creando...' : 'Crear Usuario'}
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
        </AppLayout>
    );
}
