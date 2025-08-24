import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layouts/main-layout';
import { Form } from '@inertiajs/react';
import { LoaderCircle, User } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <MainLayout title="Iniciar Sesión - IN-NOVA" description="Accede a tu cuenta en la Red de Innovación">
            <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md mx-auto">
                        <Card className="shadow-lg border-0">
                            <CardHeader className="text-center pb-2">
                                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <User className="h-6 w-6 text-blue-600" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    Iniciar Sesión
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                    Accede a tu cuenta en la Red de Innovación
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {status && (
                                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                                        <p className="text-sm font-medium text-green-600 text-center">{status}</p>
                                    </div>
                                )}

                                <Form method="post" action={route('login')} resetOnSuccess={['password']} className="space-y-6">
                                    {({ processing, errors }) => (
                                        <>
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="email" className="text-gray-700">
                                                        Correo Electrónico *
                                                    </Label>
                                                    <p className="text-xs text-gray-500 mb-2">
                                                        Ingresa el correo electrónico con el que te registraste
                                                    </p>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        required
                                                        autoFocus
                                                        tabIndex={1}
                                                        autoComplete="email"
                                                        placeholder="tu-email@ejemplo.com"
                                                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                                                    />
                                                    <InputError message={errors.email} />
                                                </div>

                                                <div>
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="password" className="text-gray-700">
                                                            Contraseña *
                                                        </Label>
                                                        {canResetPassword && (
                                                            <TextLink
                                                                href={route('password.request')}
                                                                className="text-sm text-blue-600 hover:text-blue-800"
                                                                tabIndex={5}
                                                            >
                                                                ¿Olvidaste tu contraseña?
                                                            </TextLink>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-500 mb-2">
                                                        Ingresa la contraseña de tu cuenta
                                                    </p>
                                                    <input
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        required
                                                        tabIndex={2}
                                                        autoComplete="current-password"
                                                        placeholder="Tu contraseña"
                                                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                                                    />
                                                    <InputError message={errors.password} />
                                                </div>

                                                <div className="flex items-center space-x-3">
                                                    <Checkbox id="remember" name="remember" tabIndex={3} />
                                                    <Label htmlFor="remember" className="text-gray-700">
                                                        Recordarme
                                                    </Label>
                                                </div>
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                                                tabIndex={4}
                                                disabled={processing}
                                            >
                                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                                Iniciar Sesión
                                            </Button>

                                            <div className="text-center text-sm text-gray-600">
                                                ¿No tienes una cuenta?{' '}
                                                <TextLink href={route('register')} className="text-blue-600 hover:text-blue-800" tabIndex={5}>
                                                    Regístrate aquí
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
