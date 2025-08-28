import React from 'react';
import { Form } from '@inertiajs/react';
import { LoaderCircle, Building2 } from 'lucide-react';

import MainLayout from '@/layouts/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

export default function RegisterCompany() {
  const [openTerms, setOpenTerms] = React.useState(false);
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
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
                <Form method="post" action={route('register.company')} encType="multipart/form-data" className="space-y-8">
                  {({ processing, errors }) => (
                    <>
                      <input type="hidden" name="accept_terms" value={acceptedTerms ? '1' : '0'} />
                      {/* Datos de usuario */}
                      <section>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Datos del usuario</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name" className="text-gray-700">Nombre completo *</Label>
                            <p className="text-xs text-gray-500 mb-2">
                              Ingresa tu nombre completo como aparecerá en la plataforma
                            </p>
                            <input id="name" name="name" type="text" autoComplete="name" placeholder="Tu nombre" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" />
                            <InputError message={errors.name} />
                          </div>
                          <div>
                            <Label htmlFor="username" className="text-gray-700">Nombre de usuario</Label>
                            <p className="text-xs text-gray-500 mb-2">
                              Crea un nombre de usuario único para acceder a la plataforma
                            </p>
                            <input id="username" name="username" type="text" autoComplete="username" placeholder="empresa_admin" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" />
                            <InputError message={errors.username} />
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-gray-700">Correo electrónico *</Label>
                            <p className="text-xs text-gray-500 mb-2">
                              Usa un correo electrónico válido para recibir notificaciones
                            </p>
                            <input id="email" name="email" type="email" autoComplete="email" placeholder="correo@empresa.com" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" />
                            <InputError message={errors.email} />
                          </div>
                          <div>
                            <Label htmlFor="password" className="text-gray-700">Contraseña *</Label>
                            <p className="text-xs text-gray-500 mb-2">
                              Crea una contraseña segura con al menos 8 caracteres
                            </p>
                            <input id="password" name="password" type="password" autoComplete="new-password" placeholder="Crea una contraseña" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" />
                            <InputError message={errors.password} />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="password_confirmation" className="text-gray-700">Confirmar contraseña *</Label>
                            <p className="text-xs text-gray-500 mb-2">
                              Repite la contraseña para confirmar que la escribiste correctamente
                            </p>
                            <input id="password_confirmation" name="password_confirmation" type="password" autoComplete="new-password" placeholder="Repite tu contraseña" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" />
                            <InputError message={errors.password_confirmation} />
                          </div>
                        </div>
                      </section>

                      {/* Datos de la empresa */}
                      <section>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Datos de la empresa</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <Label htmlFor="company_name" className="text-gray-700">Nombre de la empresa *</Label>
                            <p className="text-xs text-gray-500 mb-2">
                              Ingresa el nombre legal de la empresa tal como aparece en los documentos oficiales
                            </p>
                            <input id="company_name" name="company_name" type="text" placeholder="Nombre legal de la empresa" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" />
                            <InputError message={errors.company_name} />
                          </div>
                          <div>
                            <Label htmlFor="nit" className="text-gray-700">NIT *</Label>
                            <p className="text-xs text-gray-500 mb-2">
                              Ingresa el Número de Identificación Tributaria de la empresa
                            </p>
                            <input id="nit" name="nit" type="text" placeholder="123456789-0" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" />
                            <InputError message={errors.nit} />
                          </div>
                          <div>
                            <Label htmlFor="address" className="text-gray-700">Dirección *</Label>
                            <p className="text-xs text-gray-500 mb-2">
                              Dirección física principal de la empresa
                            </p>
                            <input id="address" name="address" type="text" placeholder="Dirección de la empresa" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" />
                            <InputError message={errors.address} />
                          </div>
                          <div>
                            <Label htmlFor="responsible_name" className="text-gray-700">Nombre del responsable *</Label>
                            <p className="text-xs text-gray-500 mb-2">
                              Nombre completo de la persona responsable de la cuenta
                            </p>
                            <input id="responsible_name" name="responsible_name" type="text" placeholder="Nombre del responsable" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" />
                            <InputError message={errors.responsible_name} />
                          </div>
                          <div>
                            <Label htmlFor="responsible_email" className="text-gray-700">Correo del responsable *</Label>
                            <p className="text-xs text-gray-500 mb-2">
                              Correo electrónico del responsable para comunicaciones oficiales
                            </p>
                            <input id="responsible_email" name="responsible_email" type="email" placeholder="responsable@empresa.com" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" />
                            <InputError message={errors.responsible_email} />
                          </div>
                          <div>
                            <Label htmlFor="responsible_phone" className="text-gray-700">Teléfono del responsable *</Label>
                            <p className="text-xs text-gray-500 mb-2">
                              Número de teléfono para contactar al responsable
                            </p>
                            <input id="responsible_phone" name="responsible_phone" type="text" placeholder="3001234567" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" />
                            <InputError message={errors.responsible_phone} />
                          </div>
                          <div>
                            <Label htmlFor="responsible_position" className="text-gray-700">Cargo del responsable *</Label>
                            <p className="text-xs text-gray-500 mb-2">
                              Cargo o posición del responsable dentro de la empresa
                            </p>
                            <input id="responsible_position" name="responsible_position" type="text" placeholder="Cargo" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" />
                            <InputError message={errors.responsible_position} />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="logo" className="text-gray-700">Logo (opcional)</Label>
                            <p className="text-xs text-gray-500 mb-2">
                              Sube el logo de tu empresa en formato PNG, JPG o SVG (máximo 2MB)
                            </p>
                            <input id="logo" name="logo" type="file" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400" />
                            <InputError message={errors.logo} />
                          </div>
                        </div>
                      </section>

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
                            <Label htmlFor="accept_terms" className="font-medium text-gray-800">He leído y acepto los Términos y Condiciones</Label>
                            <div>
                              <button type="button" onClick={() => setOpenTerms(true)} className="text-blue-600 hover:text-blue-800 underline">
                                Ver Términos y Condiciones
                              </button>
                            </div>
                            {!acceptedTerms && (
                              <p className="text-xs text-gray-500 mt-1">Debes aceptar los términos para continuar.</p>
                            )}
                          </div>
                        </div>
                      </section>

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={processing || !acceptedTerms}>
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

                {/* Modal de Términos y Condiciones */}
                <Dialog open={openTerms} onOpenChange={setOpenTerms}>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Formato de Aceptación – Convenio de Colaboración para la Innovación Abierta</DialogTitle>
                      <DialogDescription>
                        La empresa que suscribe este documento acepta las siguientes condiciones para su participación como aliada estratégica dentro de la Red de Innovación de Córdoba:
                      </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[60vh] overflow-y-auto space-y-4 text-sm text-gray-700">
                      <section>
                        <h4 className="font-semibold">1. Bienvenida y participación en Innovación Abierta</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Acepto que mi empresa participe en la iniciativa de Innovación Abierta de IN-NOVA S.A.S., diseñada para promover un enfoque colaborativo entre empresas, universidades, instituciones educativas y emprendedores.</li>
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Reconozco que este modelo busca desarrollar soluciones innovadoras para los desafíos específicos de las organizaciones, potenciando la transformación y el crecimiento empresarial mediante la creatividad colectiva.</li>
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">2. Retos empresariales y participación de estudiantes</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Me comprometo a plantear un reto o desafío concreto, que será presentado a estudiantes de universidades e instituciones educativas vinculadas.</li>
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Acepto que los estudiantes desarrollen prototipos de solución, los cuales serán evaluados por mi empresa, con la posibilidad de seleccionar el más prometedor según su capacidad de cumplir los resultados esperados.</li>
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Reconozco que el prototipo ganador será sometido a un periodo de prueba de máximo un mes dentro de la empresa, para verificar su efectividad y viabilidad en condiciones reales.</li>
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">3. Reconocimientos e incentivos para estudiantes y docentes</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Acepto que los estudiantes que desarrollen un prototipo funcional recibirán una recompensa compuesta por:</li>
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Beneficios en especie: opcionales y definidos por la empresa.</li>
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Premio económico: de valor libremente establecido por la empresa, calculado en función de los beneficios que la solución pueda aportar durante un mes.</li>
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Me comprometo a otorgar a los estudiantes un Certificado de Experiencia y Habilidades en Innovación y al profesor un Certificado de Innovación Empresarial, que reconozca su acompañamiento y orientación.</li>
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Reconozco que el mentor de In-nova podrá desarrollar un artículo científico basado en la investigación realizada, siempre en cumplimiento de las políticas de datos de la empresa.</li>
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">4. Vinculación de estudiantes y obligaciones de la empresa</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Acepto que los estudiantes vinculados serán considerados pasantes o practicantes de In-nova, bajo la coordinación de esta entidad.</li>
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Me comprometo a realizar un pago a In-nova, con el fin de que esta gestione el cubrimiento de la seguridad social (ARL) de los estudiantes seleccionados como ganadores del reto propuesto.</li>
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Reconozco que los estudiantes podrán realizar monografías, estudios o informes académicos basados en su experiencia, pudiendo emplear esta participación como proyecto de grado o requisito de graduación según las políticas de su institución educativa.</li>
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">5. Propiedad intelectual y continuidad del proyecto</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Reconozco y acepto que toda la propiedad intelectual derivada de los resultados, investigaciones y productos obtenidos en el marco de este convenio pertenecerá de manera exclusiva a In-nova, sin perjuicio del reconocimiento académico para los estudiantes.</li>
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Entiendo que, al finalizar el periodo de prueba, mi empresa podrá optar libremente y sin obligación por formalizar un contrato con IN-NOVA S.A.S., para implementar la solución de manera completa y permanente.</li>
                        </ul>
                      </section>
                      <section>
                        <h4 className="font-semibold">6. Ecosistema de innovación y responsabilidades adicionales</h4>
                        <ul className="list-none space-y-2">
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Acepto que este proceso hace parte de la Red de Innovación de Córdoba, estrategia que conecta empresas, universidades e instituciones para fortalecer la competitividad, la tecnología y el impacto económico regional.</li>
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Reconozco que, si para la prueba del prototipo se requieren equipos, maquinaria, información, bases de datos u otros insumos, mi empresa será responsable de proveerlos.</li>
                          <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-500">Acepto que los estudiantes aportarán únicamente su conocimiento, creatividad, análisis y ejecución, sin que se les exija asumir gastos adicionales ni inversión en materiales.</li>
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
                        Acepto los Términos
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


