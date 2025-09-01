import React from 'react';
import { Form } from '@inertiajs/react';
import { LoaderCircle, GraduationCap } from 'lucide-react';

import MainLayout from '@/layouts/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

export default function RegisterStudent() {
  const [openTerms, setOpenTerms] = React.useState(false);
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
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
                      <input type="hidden" name="accept_terms" value={acceptedTerms ? '1' : '0'} />
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-gray-700">Nombre completo *</Label>
                          <p className="text-xs text-gray-500 mb-2">
                            Ingresa tu nombre completo como aparecerá en la plataforma
                          </p>
                          <input id="name" name="name" type="text" autoComplete="name" autoFocus placeholder="Tu nombre" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" aria-invalid={!!errors.name} />
                          <InputError message={errors.name} />
                        </div>

                        <div>
                          <Label htmlFor="username" className="text-gray-700">Nombre de usuario</Label>
                          <p className="text-xs text-gray-500 mb-2">
                            Crea un nombre de usuario único para acceder a la plataforma
                          </p>
                          <input id="username" name="username" type="text" autoComplete="username" placeholder="usuario123" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" aria-invalid={!!errors.username} />
                          <InputError message={errors.username} />
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-gray-700">Correo electrónico *</Label>
                          <p className="text-xs text-gray-500 mb-2">
                            Usa un correo electrónico válido para recibir notificaciones
                          </p>
                          <input id="email" name="email" type="email" autoComplete="email" placeholder="tu-email@ejemplo.com" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" aria-invalid={!!errors.email} />
                          <InputError message={errors.email} />
                        </div>

                        <div>
                          <Label htmlFor="password" className="text-gray-700">Contraseña *</Label>
                          <p className="text-xs text-gray-500 mb-2">
                            Crea una contraseña segura con al menos 8 caracteres
                          </p>
                          <input id="password" name="password" type="password" autoComplete="new-password" placeholder="Crea una contraseña" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" aria-invalid={!!errors.password} />
                          <InputError message={errors.password} />
                        </div>

                        <div>
                          <Label htmlFor="password_confirmation" className="text-gray-700">Confirmar contraseña *</Label>
                          <p className="text-xs text-gray-500 mb-2">
                            Repite la contraseña para confirmar que la escribiste correctamente
                          </p>
                          <input id="password_confirmation" name="password_confirmation" type="password" autoComplete="new-password" placeholder="Repite tu contraseña" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" aria-invalid={!!errors.password_confirmation} />
                          <InputError message={errors.password_confirmation} />
                        </div>


                      </div>

                      {/* Aceptación de términos */}
                      <section>
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="accept_terms"
                            checked={acceptedTerms}
                            onCheckedChange={(v) => setAcceptedTerms(Boolean(v))}
                            className="mt-1"
                          />
                          <div className="text-sm text-gray-700">
                            <Label htmlFor="accept_terms" className="font-medium text-gray-800">He leído y acepto el Acuerdo de Colaboración</Label>
                            <div>
                              <button type="button" onClick={() => setOpenTerms(true)} className="text-blue-600 hover:text-blue-800 underline">
                                Ver Acuerdo de Colaboración
                              </button>
                            </div>
                            {!acceptedTerms && (
                              <p className="text-xs text-gray-500 mt-1">Debes aceptar el acuerdo para continuar.</p>
                            )}
                          </div>
                        </div>
                      </section>

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={processing || !acceptedTerms}>
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

                {/* Modal de Acuerdo de Colaboración */}
                <Dialog open={openTerms} onOpenChange={setOpenTerms}>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Acuerdo de Colaboración entre In-nova y Estudiantes</DialogTitle>
                      <DialogDescription>
                        A continuación se describen las condiciones de participación para estudiantes ("Retadores") en procesos de innovación abierta.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[60vh] overflow-y-auto space-y-4 text-sm text-gray-700">
                      <section>
                        <h4 className="font-semibold">1. Objetivo del Acuerdo</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">El presente acuerdo establece la colaboración entre In-nova y un grupo de estudiantes ("Retadores"), junto con un Líder de Proyecto, para participar en un proceso de innovación abierta. El objetivo es desarrollar un prototipo funcional que se presentará a una empresa para su evaluación y selección según sus necesidades.</li>
                          
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">2. Confidencialidad</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Los Retadores se comprometen a no utilizar la información y datos proporcionados por la empresa para ninguna otra finalidad que no sea la presentación y validación del prototipo.</li>
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">3. Remuneración</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Los Retadores recibirán los beneficios y recompensas económicas que la empresa decida otorgar.</li>
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">4. Proceso de Ajustes</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Durante el mes de pruebas, los Retadores deberán realizar los ajustes necesarios al prototipo. Se establecerá un espacio de retroalimentación con un coordinador de In-nova para verificar la implementación de las mejoras.</li>
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">5. Orientación y Mentoría</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Los Retadores podrán contar con el apoyo de su profesor como orientador; sin embargo, este orientador o mentor no será reconocido como parte del equipo del proyecto.</li>
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">6. Derechos de Autor</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Los estudiantes deben participar en un proyecto colaborativo como requisito para participar en retos de empresas; los derechos de autor de estos proyectos serán propiedad de In-nova.</li>
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Los derechos de autor del prototipo pertenecen exclusivamente a los Retadores.</li>
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">El valor del prototipo será evaluado por In-nova y, en caso de ser aprobado, la empresa podrá conocer la oferta de los Retadores. In-nova tendrá opción de compra del prototipo para su comercialización.</li>
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">7. Apoyo Profesional dentro del Proyecto</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Los estudiantes serán el único equipo de trabajo para el proyecto. No se aceptará ningún apoyo profesional dentro de los equipos de prototipado.</li>
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">8. Penalización por Incumplimiento</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Si algún miembro del equipo no cumple con los entregables del proyecto, será apartado para garantizar la entrega de los requerimientos en los plazos acordados.</li>
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">9. Oportunidades Adicionales</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Los estudiantes podrán desarrollar otros prototipos y presentarlos como demos de un mes para evaluación por parte de empresas de la red de innovación, previa autorización de In-nova.</li>
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Esto facilita la incubación de startups, la posibilidad de conseguir clientes y financiamiento, reduciendo la necesidad de inversión inicial.</li>
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">10. Prohibición de Contratación Directa</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Los Retadores no podrán realizar contratos directos con la empresa que emite el reto.</li>
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">11. Condiciones de Participación</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Solo podrán participar estudiantes universitarios o de otras instituciones que acrediten estar cursando estudios en el campo del reto.</li>
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">12. Beneficios Académicos para Profesores Líderes</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Los profesores orientadores podrán acceder a los beneficios que sus universidades ofrezcan (fondos de investigación, laboratorios, asesoría técnica, respaldo institucional, etc.) y tendrán la posibilidad de realizar publicaciones científicas basadas en la experiencia y resultados del proyecto, previa autorización de la empresa.</li>
                        </ul>
                      </section>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="secondary" onClick={() => setOpenTerms(false)}>Cerrar</Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setAcceptedTerms(true);
                          setOpenTerms(false);
                        }}
                      >
                        Acepto el Acuerdo
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}


