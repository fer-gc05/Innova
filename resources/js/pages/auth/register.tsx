import { Form } from '@inertiajs/react';
import { LoaderCircle, UserPlus } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layouts/main-layout';

export default function Register() {
    return (
        <MainLayout title="Registrarse - IN-NOVA" description="Crea tu cuenta en la Red de Innovación">
            <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md mx-auto">
                        <Card className="shadow-lg border-0">
                            <CardHeader className="text-center pb-2">
                                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <UserPlus className="h-6 w-6 text-blue-600" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    Crear Cuenta
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                    Únete a la Red de Innovación de Córdoba
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <Form
                                    method="post"
                                    action={route('register')}
                                    resetOnSuccess={['password', 'password_confirmation']}
                                    disableWhileProcessing
                                    className="space-y-6"
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="name" className="text-gray-700">
                                                        Nombre Completo
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        required
                                                        autoFocus
                                                        tabIndex={1}
                                                        autoComplete="name"
                                                        name="name"
                                                        placeholder="Tu nombre completo"
                                                        className="mt-1"
                                                    />
                                                    <InputError message={errors.name} />
                                                </div>

                                                <div>
                                                    <Label htmlFor="email" className="text-gray-700">
                                                        Correo Electrónico
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        required
                                                        tabIndex={2}
                                                        autoComplete="email"
                                                        name="email"
                                                        placeholder="tu-email@ejemplo.com"
                                                        className="mt-1"
                                                    />
                                                    <InputError message={errors.email} />
                                                </div>

                                                <div>
                                                    <Label htmlFor="password" className="text-gray-700">
                                                        Contraseña
                                                    </Label>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        required
                                                        tabIndex={3}
                                                        autoComplete="new-password"
                                                        name="password"
                                                        placeholder="Crea una contraseña segura"
                                                        className="mt-1"
                                                    />
                                                    <InputError message={errors.password} />
                                                </div>

                                                <div>
                                                    <Label htmlFor="password_confirmation" className="text-gray-700">
                                                        Confirmar Contraseña
                                                    </Label>
                                                    <Input
                                                        id="password_confirmation"
                                                        type="password"
                                                        required
                                                        tabIndex={4}
                                                        autoComplete="new-password"
                                                        name="password_confirmation"
                                                        placeholder="Confirma tu contraseña"
                                                        className="mt-1"
                                                    />
                                                    <InputError message={errors.password_confirmation} />
                                                </div>
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                                                tabIndex={5}
                                                disabled={processing}
                                            >
                                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                                Crear Cuenta
                                            </Button>

                                            <div className="text-center text-sm text-gray-600">
                                                ¿Ya tienes una cuenta?{' '}
                                                <TextLink href={route('login')} className="text-blue-600 hover:text-blue-800" tabIndex={6}>
                                                    Inicia sesión aquí
                                                </TextLink>
                                            </div>
                                        </>
                                    )}
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
