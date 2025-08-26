import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Users, User, UserPlus, LoaderCircle, CheckCircle, ArrowRight, ArrowLeft, Award } from 'lucide-react';
import InputError from '@/components/input-error';

interface Props {
  challenge: any;
  student: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function StepByStepRegistrationModal({ challenge, student, isOpen, onClose }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [groupInfo, setGroupInfo] = useState<any>(null);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [showRewardInfo, setShowRewardInfo] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    // Paso 1: Tipo de participación
    participation_type: 'individual',
    join_group_code: '',

    // Paso 2: Información personal (pre-llenada)
    full_name: student?.name || '',
    email: student?.email || '',
    phone_number: '',
    motivation: '',

    // Paso 3: Información del prototipo
    prototype_price: '',
    estimated_delivery_days: '',
    group_name: '',
    group_max_participants: '5',
  });

  // Pre-llenar datos del estudiante cuando se abre el modal
  useEffect(() => {
    if (isOpen && student) {
      setData({
        ...data,
        full_name: student.name || '',
        email: student.email || '',
        phone_number: student.phone_number || '',
      });
    }
  }, [isOpen, student, setData]);

  // Resetear formulario cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      reset();
      setCurrentStep(1);
      setGroupInfo(null);
    }
  }, [isOpen, reset]);

  // Verificar código de grupo
  const verifyGroupCode = async (code: string) => {
    if (code.length !== 8) return;

    setVerifyingCode(true);

    try {
      const response = await fetch(`/student/challenges/${challenge.id}/verify-group-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ group_code: code }),
      });

      if (response.ok) {
        const groupData = await response.json();
        setGroupInfo(groupData);
      } else {
        setGroupInfo(null);
      }
    } catch (error) {
      setGroupInfo(null);
    }

    setVerifyingCode(false);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (data.participation_type === 'join_group' && data.join_group_code) {
        verifyGroupCode(data.join_group_code);
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(`/student/challenges/${challenge.id}/join`, {
      onSuccess: () => {
        onClose();
        router.reload();
      },
      onError: (errors: any) => {
        console.error('Error en la inscripción:', errors);
      },
    });
  };

  const resetModal = () => {
    setCurrentStep(1);
    setGroupInfo(null);
    setVerifyingCode(false);
    setShowRewardInfo(false);
    reset();
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const steps = [
    { number: 1, title: 'Tipo de Participación', icon: Users },
    { number: 2, title: 'Información Personal', icon: User },
    { number: 3, title: 'Propuesta y Confirmación', icon: CheckCircle },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white border border-gray-200 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Inscripción al Reto: {challenge.name}
          </DialogTitle>
        </DialogHeader>

                {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  isActive ? 'bg-blue-600 border-blue-600 text-white' :
                  isCompleted ? 'bg-green-600 border-green-600 text-white' :
                  'bg-gray-100 border-gray-300 text-gray-500'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <div className="ml-2">
                  <div className={`text-xs font-medium ${
                    isActive ? 'text-blue-600' :
                    isCompleted ? 'text-green-600' :
                    'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    isCompleted ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Paso 1: Tipo de Participación */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  ¿Cómo te gustaría participar?
                </h3>
                <RadioGroup
                  value={data.participation_type}
                  onValueChange={(value) => setData('participation_type', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual" className="flex-1 cursor-pointer">
                      <div className="font-medium">Participación Individual</div>
                      <div className="text-sm text-gray-500">Participa solo en el reto</div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="leader" id="leader" />
                    <Label htmlFor="leader" className="flex-1 cursor-pointer">
                      <div className="font-medium">Crear un Grupo</div>
                      <div className="text-sm text-gray-500">Crea un grupo y convoca a otros estudiantes</div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="join_group" id="join_group" />
                    <Label htmlFor="join_group" className="flex-1 cursor-pointer">
                      <div className="font-medium">Unirse a un Grupo</div>
                      <div className="text-sm text-gray-500">Únete a un grupo existente con un código</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {data.participation_type === 'join_group' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="join_group_code">Código del Grupo</Label>
                    <Input
                      id="join_group_code"
                      type="text"
                      value={data.join_group_code}
                      onChange={(e) => {
                        setData('join_group_code', e.target.value.toUpperCase());
                        if (e.target.value.length === 8) {
                          verifyGroupCode(e.target.value.toUpperCase());
                        }
                      }}
                      placeholder="Ingresa el código de 8 caracteres"
                      maxLength={8}
                      className="uppercase"
                    />
                    {errors.join_group_code && <InputError message={errors.join_group_code} />}
                  </div>

                  {verifyingCode && (
                    <div className="flex items-center space-x-2 text-blue-600">
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                      <span>Verificando código...</span>
                    </div>
                  )}

                  {groupInfo && (
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="font-medium text-green-800">Grupo encontrado:</div>
                          <div className="text-sm text-green-700">
                            <div><strong>Nombre:</strong> {groupInfo.group_name}</div>
                            <div><strong>Líder:</strong> {groupInfo.leader_name}</div>
                            <div><strong>Miembros:</strong> {groupInfo.current_members}/{groupInfo.max_participants}</div>
                            <div><strong>Espacios disponibles:</strong> {groupInfo.available_spots}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {data.join_group_code.length === 8 && !verifyingCode && !groupInfo && (
                    <div className="text-red-600 text-sm">
                      Código de grupo no encontrado o grupo lleno.
                    </div>
                  )}
                </div>
              )}

              {data.participation_type === 'leader' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="group_name">Nombre del Grupo</Label>
                    <Input
                      id="group_name"
                      type="text"
                      value={data.group_name}
                      onChange={(e) => setData('group_name', e.target.value)}
                      placeholder="Ej: Equipo Innovador 2025"
                    />
                    {errors.group_name && <InputError message={errors.group_name} />}
                  </div>

                  <div>
                    <Label htmlFor="group_max_participants">Máximo de Participantes</Label>
                    <Select
                      value={data.group_max_participants}
                      onValueChange={(value) => setData('group_max_participants', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} participantes
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.group_max_participants && <InputError message={errors.group_max_participants} />}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Paso 2: Información Personal */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Información Personal
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Los datos básicos se han pre-llenado con tu información de perfil.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name">Nombre Completo</Label>
                  <Input
                    id="full_name"
                    type="text"
                    value={data.full_name}
                    onChange={(e) => setData('full_name', e.target.value)}
                    placeholder="Tu nombre completo"
                  />
                  {errors.full_name && <InputError message={errors.full_name} />}
                </div>

                <div>
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <InputError message={errors.email} />}
                </div>
              </div>

              <div>
                <Label htmlFor="phone_number">Número de Teléfono</Label>
                <Input
                  id="phone_number"
                  type="tel"
                  value={data.phone_number}
                  onChange={(e) => setData('phone_number', e.target.value)}
                  placeholder="+57 300 123 4567"
                />
                {errors.phone_number && <InputError message={errors.phone_number} />}
              </div>

              <div>
                <Label htmlFor="motivation">Motivación para Participar (Opcional)</Label>
                <Textarea
                  id="motivation"
                  value={data.motivation}
                  onChange={(e) => setData('motivation', e.target.value)}
                  placeholder="Cuéntanos por qué te interesa este reto y qué esperas lograr..."
                  rows={4}
                />
                {errors.motivation && <InputError message={errors.motivation} />}
              </div>
            </div>
          )}

          {/* Paso 3: Propuesta y Confirmación */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Propuesta del Prototipo
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Define los detalles de tu propuesta de solución.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prototype_price">Precio del Prototipo (COP)</Label>
                  <Input
                    id="prototype_price"
                    type="number"
                    value={data.prototype_price}
                    onChange={(e) => setData('prototype_price', e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                  {errors.prototype_price && <InputError message={errors.prototype_price} />}
                </div>

                <div>
                  <Label htmlFor="estimated_delivery_days">Días Estimados de Entrega</Label>
                  <Input
                    id="estimated_delivery_days"
                    type="number"
                    value={data.estimated_delivery_days}
                    onChange={(e) => setData('estimated_delivery_days', e.target.value)}
                    placeholder="30"
                    min="1"
                    max="365"
                  />
                  {errors.estimated_delivery_days && <InputError message={errors.estimated_delivery_days} />}
                </div>
              </div>

              {/* Información de Recompensa */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Información sobre Recompensas</h4>
                      <div className="text-sm text-blue-800 space-y-1">
                        <p>• La empresa evaluará todas las propuestas presentadas</p>
                        <p>• Solo recibirás recompensas si tu prototipo es seleccionado</p>
                        <p>• El proceso de selección puede tomar varias semanas</p>
                        <p>• Mantendremos informado sobre el estado de tu propuesta</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resumen de la inscripción */}
              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Resumen de tu Inscripción</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div><strong>Tipo:</strong> {data.participation_type === 'individual' ? 'Individual' : data.participation_type === 'leader' ? 'Líder de Grupo' : 'Miembro de Grupo'}</div>
                    {data.participation_type === 'leader' && (
                      <div><strong>Grupo:</strong> {data.group_name}</div>
                    )}
                    <div><strong>Nombre:</strong> {data.full_name}</div>
                    <div><strong>Email:</strong> {data.email}</div>
                    <div><strong>Teléfono:</strong> {data.phone_number}</div>
                    <div><strong>Precio Prototipo:</strong> ${data.prototype_price} COP</div>
                    <div><strong>Días de Entrega:</strong> {data.estimated_delivery_days} días</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Botones de Navegación */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </Button>

            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && data.participation_type === 'join_group' && !groupInfo) ||
                  (currentStep === 1 && data.participation_type === 'leader' && (!data.group_name || !data.group_max_participants)) ||
                  (currentStep === 2 && (!data.full_name || !data.email || !data.phone_number))
                }
                className="flex items-center space-x-2"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={processing || !data.prototype_price || !data.estimated_delivery_days}
                className="flex items-center space-x-2"
              >
                {processing ? (
                  <>
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                    <span>Inscribiendo...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Completar Inscripción</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
