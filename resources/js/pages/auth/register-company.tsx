import React from 'react';
import { Form } from '@inertiajs/react';
import { LoaderCircle, Building2 } from 'lucide-react';

import MainLayout from '@/layouts/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';

export default function RegisterCompany() {
  return (
    <MainLayout title="Registro de Empresa - IN-NOVA" description="Crea la cuenta de tu empresa para gestionar retos">
      <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Registro de Empresa
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Crea la cuenta de tu empresa para publicar y gestionar retos
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form method="post" action={route('register.company')} className="space-y-8">
                  {({ processing, errors }) => (
                    <>
                      {/* Datos de usuario */}
                      <section>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Datos del usuario</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name" className="text-gray-700">Nombre completo</Label>
                            <Input id="name" name="name" type="text" autoComplete="name" placeholder="Tu nombre" className="mt-1" />
                            <InputError message={errors.name} />
                          </div>
                          <div>
                            <Label htmlFor="username" className="text-gray-700">Nombre de usuario</Label>
                            <Input id="username" name="username" type="text" autoComplete="username" placeholder="empresa_admin" className="mt-1" />
                            <InputError message={errors.username} />
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-gray-700">Correo electrónico</Label>
                            <Input id="email" name="email" type="email" autoComplete="email" placeholder="correo@empresa.com" className="mt-1" />
                            <InputError message={errors.email} />
                          </div>
                          <div>
                            <Label htmlFor="password" className="text-gray-700">Contraseña</Label>
                            <Input id="password" name="password" type="password" autoComplete="new-password" placeholder="Crea una contraseña" className="mt-1" />
                            <InputError message={errors.password} />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="password_confirmation" className="text-gray-700">Confirmar contraseña</Label>
                            <Input id="password_confirmation" name="password_confirmation" type="password" autoComplete="new-password" placeholder="Repite tu contraseña" className="mt-1" />
                            <InputError message={errors.password_confirmation} />
                          </div>
                        </div>
                      </section>

                      {/* Datos de la empresa */}
                      <section>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Datos de la empresa</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <Label htmlFor="company_name" className="text-gray-700">Nombre de la empresa</Label>
                            <Input id="company_name" name="company_name" type="text" placeholder="Nombre legal de la empresa" className="mt-1" />
                            <InputError message={errors.company_name} />
                          </div>
                          <div>
                            <Label htmlFor="nit" className="text-gray-700">NIT</Label>
                            <Input id="nit" name="nit" type="text" placeholder="123456789-0" className="mt-1" />
                            <InputError message={errors.nit} />
                          </div>
                          <div>
                            <Label htmlFor="address" className="text-gray-700">Dirección</Label>
                            <Input id="address" name="address" type="text" placeholder="Dirección de la empresa" className="mt-1" />
                            <InputError message={errors.address} />
                          </div>
                          <div>
                            <Label htmlFor="responsible_name" className="text-gray-700">Nombre del responsable</Label>
                            <Input id="responsible_name" name="responsible_name" type="text" placeholder="Nombre del responsable" className="mt-1" />
                            <InputError message={errors.responsible_name} />
                          </div>
                          <div>
                            <Label htmlFor="responsible_email" className="text-gray-700">Correo del responsable</Label>
                            <Input id="responsible_email" name="responsible_email" type="email" placeholder="responsable@empresa.com" className="mt-1" />
                            <InputError message={errors.responsible_email} />
                          </div>
                          <div>
                            <Label htmlFor="responsible_phone" className="text-gray-700">Teléfono del responsable</Label>
                            <Input id="responsible_phone" name="responsible_phone" type="text" placeholder="3001234567" className="mt-1" />
                            <InputError message={errors.responsible_phone} />
                          </div>
                          <div>
                            <Label htmlFor="responsible_position" className="text-gray-700">Cargo del responsable</Label>
                            <Input id="responsible_position" name="responsible_position" type="text" placeholder="Cargo" className="mt-1" />
                            <InputError message={errors.responsible_position} />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="logo" className="text-gray-700">Logo (opcional)</Label>
                            <Input id="logo" name="logo" type="file" className="mt-1" />
                            <InputError message={errors.logo} />
                          </div>
                        </div>
                      </section>

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Crear cuenta de empresa
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


