// Components
import { Form } from '@inertiajs/react';
import { LoaderCircle, Mail } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layouts/main-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <MainLayout title="Recuperar contraseña - IN-NOVA" description="Ingresa tu correo para recibir el enlace de restablecimiento">
            <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md mx-auto">
                        <Card className="shadow-lg border-0">
                            <CardHeader className="text-center pb-2">
                                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <Mail className="h-6 w-6 text-blue-600" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    Recuperar contraseña
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                    Te enviaremos un enlace para restablecer tu contraseña
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {status && (
                                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                                        <p className="text-sm font-medium text-green-600 text-center">{status}</p>
                                    </div>
                                )}

                                <Form method="post" action={route('password.email')} className="space-y-6">
                                    {({ processing, errors }) => (
                                        <>
                                            <div>
                                                <Label htmlFor="email" className="text-gray-700">Correo Electrónico</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    autoComplete="off"
                                                    autoFocus
                                                    placeholder="tu-email@ejemplo.com"
                                                    className="mt-1"
                                                />
                                                <InputError message={errors.email} />
                                            </div>

                                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={processing}>
                                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                                Enviar enlace de restablecimiento
                                            </Button>
                                        </>
                                    )}
                                </Form>

                                <div className="mt-4 space-x-1 text-center text-sm text-gray-600">
                                    <span>¿Recordaste tu contraseña?</span>
                                    <TextLink href={route('login')} className="text-blue-600 hover:text-blue-800">Inicia sesión</TextLink>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
