import React from 'react';
import { Form } from '@inertiajs/react';
import { LoaderCircle, GraduationCap } from 'lucide-react';

import MainLayout from '@/layouts/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';

export default function RegisterStudent() {
  return (
    <MainLayout title="Registro de Estudiante - IN-NOVA" description="Crea tu cuenta de estudiante para participar en retos activos">
      <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card className="shadow-lg border-0">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Registro de Estudiante
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Crea tu cuenta para inscribirte en retos activos
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form method="post" action={route('register.student')} className="space-y-6">
                  {({ processing, errors }) => (
                    <>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-gray-700">Nombre completo</Label>
                          <Input id="name" name="name" type="text" autoComplete="name" autoFocus placeholder="Tu nombre" className="mt-1" aria-invalid={!!errors.name} />
                          <InputError message={errors.name} />
                        </div>

                        <div>
                          <Label htmlFor="username" className="text-gray-700">Nombre de usuario</Label>
                          <Input id="username" name="username" type="text" autoComplete="username" placeholder="usuario123" className="mt-1" aria-invalid={!!errors.username} />
                          <InputError message={errors.username} />
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-gray-700">Correo electrónico</Label>
                          <Input id="email" name="email" type="email" autoComplete="email" placeholder="tu-email@ejemplo.com" className="mt-1" aria-invalid={!!errors.email} />
                          <InputError message={errors.email} />
                        </div>

                        <div>
                          <Label htmlFor="password" className="text-gray-700">Contraseña</Label>
                          <Input id="password" name="password" type="password" autoComplete="new-password" placeholder="Crea una contraseña" className="mt-1" aria-invalid={!!errors.password} />
                          <InputError message={errors.password} />
                        </div>

                        <div>
                          <Label htmlFor="password_confirmation" className="text-gray-700">Confirmar contraseña</Label>
                          <Input id="password_confirmation" name="password_confirmation" type="password" autoComplete="new-password" placeholder="Repite tu contraseña" className="mt-1" aria-invalid={!!errors.password_confirmation} />
                          <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="flex items-center space-x-3">
                          <Checkbox id="is_leader" name="is_leader" />
                          <Label htmlFor="is_leader" className="text-gray-700">Soy líder de un equipo</Label>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Crear cuenta de estudiante
                      </Button>

                      <div className="text-center text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <TextLink href={route('login')} className="text-blue-600 hover:text-blue-800">Inicia sesión</TextLink>
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


