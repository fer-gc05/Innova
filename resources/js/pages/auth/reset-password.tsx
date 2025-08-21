import { Form } from '@inertiajs/react';
import { LoaderCircle, Lock } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layouts/main-layout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    return (
        <MainLayout title="Restablecer contraseña - IN-NOVA" description="Ingresa tu nueva contraseña para restablecer el acceso">
            <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md mx-auto">
                        <Card className="shadow-lg border-0">
                            <CardHeader className="text-center pb-2">
                                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <Lock className="h-6 w-6 text-blue-600" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    Restablecer contraseña
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                    Ingresa tu nueva contraseña a continuación
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <Form
                                    method="post"
                                    action={route('password.store')}
                                    transform={(data) => ({ ...data, token, email })}
                                    resetOnSuccess={['password', 'password_confirmation']}
                                    className="space-y-6"
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            <div>
                                                <Label htmlFor="email" className="text-gray-700">Correo Electrónico</Label>
                                                <Input id="email" type="email" name="email" autoComplete="email" value={email} className="mt-1" readOnly />
                                                <InputError message={errors.email} />
                                            </div>

                                            <div>
                                                <Label htmlFor="password" className="text-gray-700">Nueva Contraseña</Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    autoComplete="new-password"
                                                    className="mt-1"
                                                    autoFocus
                                                    placeholder="Ingresa tu nueva contraseña"
                                                />
                                                <InputError message={errors.password} />
                                            </div>

                                            <div>
                                                <Label htmlFor="password_confirmation" className="text-gray-700">Confirmar Contraseña</Label>
                                                <Input
                                                    id="password_confirmation"
                                                    type="password"
                                                    name="password_confirmation"
                                                    autoComplete="new-password"
                                                    className="mt-1"
                                                    placeholder="Confirma tu nueva contraseña"
                                                />
                                                <InputError message={errors.password_confirmation} />
                                            </div>

                                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={processing}>
                                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                                Restablecer contraseña
                                            </Button>
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
