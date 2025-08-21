import { Link } from '@inertiajs/react';
import { Building2, GraduationCap, ArrowRight } from 'lucide-react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layouts/main-layout';

export default function Register() {
    return (
        <MainLayout title="Registrarse - IN-NOVA" description="Crea tu cuenta en la Red de Innovación">
            <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Únete a la Red de Innovación
                            </h1>
                            <p className="text-lg text-gray-600">
                                Selecciona el tipo de cuenta que mejor se adapte a tus necesidades
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Registro de Empresa */}
                            <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="text-center pb-4">
                                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                        <Building2 className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold text-gray-900">
                                        Registro de Empresa
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Para empresas que quieren publicar y gestionar retos de innovación
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <ul className="text-sm text-gray-600 space-y-2 mb-6">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                            Publicar retos de innovación
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                            Gestionar propuestas de estudiantes
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                            Acceso al panel de empresarios
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                            Estadísticas y reportes
                                        </li>
                                    </ul>
                                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                        <Link href={route('register.company')}>
                                            Registrarse como Empresa
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Registro de Estudiante */}
                            <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="text-center pb-4">
                                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <GraduationCap className="h-8 w-8 text-green-600" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold text-gray-900">
                                        Registro de Estudiante
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Para estudiantes que quieren participar en retos de innovación
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <ul className="text-sm text-gray-600 space-y-2 mb-6">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                            Inscribirse en retos activos
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                            Formar equipos de trabajo
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                            Enviar propuestas de solución
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                            Ganar premios y reconocimientos
                                        </li>
                                    </ul>
                                    <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                                        <Link href={route('register.student')}>
                                            Registrarse como Estudiante
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="text-center mt-8 text-sm text-gray-600">
                            ¿Ya tienes una cuenta?{' '}
                            <TextLink href={route('login')} className="text-blue-600 hover:text-blue-800">
                                Inicia sesión aquí
                            </TextLink>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
