import React, { useState, useEffect } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, User, UserPlus, LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';

interface Group {
  id: number;
  group_name: string;
  leader_name: string;
  member_count: number;
}

interface Challenge {
  id: number;
  name: string;
}

interface Props {
  challenge: Challenge;
  isRegistered?: boolean;
  userGroupCode?: string;
  isGroupLeader?: boolean;
  groupInfo?: {
    group_name: string;
    leader_name: string;
    current_members: number;
    max_participants: number;
    group_code: string;
  };
  onSuccess?: () => void;
}

export default function ChallengeRegistrationForm({ challenge, isRegistered = false, userGroupCode, isGroupLeader, groupInfo: userGroupInfo, onSuccess }: Props) {
  const [groupInfo, setGroupInfo] = useState<any>(null);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const { props } = usePage<any>();
  
  // Obtener CSRF token al nivel del componente
  const csrfToken = props.csrf_token || 
                   document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || 
                   '';
  
  // Detectar código del flash data al cargar
  React.useEffect(() => {
    if (props.flash?.groupCode && props.flash?.showCode) {
      setGeneratedCode(props.flash.groupCode);
    }
  }, [props.flash?.groupCode, props.flash?.showCode]);

  // Mostrar código existente si el usuario es líder
  React.useEffect(() => {
    if (isGroupLeader && userGroupCode && !generatedCode) {
      setGeneratedCode(userGroupCode);
    }
  }, [isGroupLeader, userGroupCode]);

  const { data, setData, post, processing, errors, reset } = useForm({
    participation_type: 'individual',
    group_name: '',
    group_max_participants: '5',
    join_group_code: '',
    motivation: '',
    
    // Información del participante
    full_name: '',
    email: '',
    phone_number: '',
    
    // Información del prototipo
    prototype_price: '',
    estimated_delivery_days: '',
  });

  // Verificar código de grupo cuando se ingresa
  const verifyGroupCode = async (code: string) => {
    if (code.length !== 8) return;
    
    setVerifyingCode(true);
    
    try {
      const response = await fetch(route('student.challenges.verify-group-code', challenge.id), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    post(route('student.challenges.join', challenge.id), {
      onSuccess: () => {
        // Usar router.reload de Inertia en lugar de window.location.reload
        router.reload();
      },
      onError: (errors: any) => {
        alert('Error en la inscripción: ' + JSON.stringify(errors));
      },
    });
  };

  const handleLeave = () => {
    let confirmMessage = '¿Estás seguro de que quieres salir de este reto?';
    
    // Personalizar mensaje según el tipo de participación
    if (isGroupLeader) {
      confirmMessage = '¿Estás seguro de que quieres salir del reto? Si tienes miembros en tu grupo, deberás transferir el liderazgo o eliminar el grupo primero.';
    } else if (userGroupInfo) {
      confirmMessage = `¿Estás seguro de que quieres salir del grupo "${userGroupInfo.group_name}"?`;
    }
    
    if (confirm(confirmMessage)) {
      router.delete(route('student.challenges.leave', challenge.id), {
        onSuccess: () => {
          router.reload();
        },
        onError: (errors) => {
          alert('Error al salir del reto: ' + Object.values(errors).join(', '));
        }
      });
    }
  };

  if (isRegistered) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">¡Ya estás inscrito!</CardTitle>
          <CardDescription>
            Ya formas parte de este reto. ¡Éxito en tu participación!
            {isGroupLeader && ' Como líder de grupo, puedes compartir tu código con otros estudiantes.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mostrar código si es líder */}
          {isGroupLeader && userGroupCode && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">👑 Tu código de líder:</h4>
              <div className="flex items-center justify-between p-3 bg-white border border-blue-300 rounded-lg">
                <span className="text-2xl font-mono font-bold text-blue-900 tracking-widest">
                  {userGroupCode}
                </span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(userGroupCode);
                    alert('¡Código copiado!');
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  📋 Copiar
                </button>
              </div>
              <p className="text-sm text-blue-700 mt-2">
                Comparte este código para que otros estudiantes se unan a tu grupo.
              </p>
            </div>
          )}

          {/* Mostrar información del grupo si es miembro */}
          {!isGroupLeader && userGroupInfo && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3">👥 Información de tu grupo:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Nombre del grupo:</span>
                  <span className="font-medium text-green-900">{userGroupInfo.group_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Líder:</span>
                  <span className="font-medium text-green-900">{userGroupInfo.leader_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Participantes:</span>
                  <span className="font-medium text-green-900">
                    {userGroupInfo.current_members} / {userGroupInfo.max_participants}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Código del grupo:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-green-900 tracking-wider">
                      {userGroupInfo.group_code}
                    </span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(userGroupInfo.group_code);
                        alert('¡Código copiado!');
                      }}
                      className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <Button 
            variant="destructive" 
            onClick={handleLeave}
            className="w-full"
          >
            Salir del Reto
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Inscribirse al Reto
        </CardTitle>
        <CardDescription>
          Elige cómo quieres participar en este reto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de Participación */}
          <div className="space-y-4">
            <Label className="text-base font-medium">¿Cómo quieres participar?</Label>
            <RadioGroup
              value={data.participation_type}
              onValueChange={(value) => setData('participation_type', value as any)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual" className="flex items-center gap-2 cursor-pointer flex-1">
                  <User className="h-4 w-4 text-blue-600" />
                  <div>
                    <div className="font-medium">Individual</div>
                    <div className="text-sm text-gray-500">Participar por mi cuenta</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="leader" id="leader" />
                <Label htmlFor="leader" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Users className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="font-medium">Líder de Grupo</div>
                    <div className="text-sm text-gray-500">Crear y liderar un nuevo grupo</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="join_group" id="join_group" />
                <Label htmlFor="join_group" className="flex items-center gap-2 cursor-pointer flex-1">
                  <UserPlus className="h-4 w-4 text-purple-600" />
                  <div>
                    <div className="font-medium">Unirse a Grupo</div>
                    <div className="text-sm text-gray-500">Unirme a un grupo existente</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
            <InputError message={errors.participation_type} />
          </div>

          {/* Configuración de Grupo (si es líder) */}
          {data.participation_type === 'leader' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="group_name">Nombre del Grupo *</Label>
                  <Input
                    id="group_name"
                    type="text"
                    value={data.group_name}
                    onChange={(e) => setData('group_name', e.target.value)}
                    placeholder="Ej: Los Innovadores"
                    className="w-full"
                  />
                  <InputError message={errors.group_name} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="group_max_participants">Límite de Participantes *</Label>
                  <Select value={data.group_max_participants} onValueChange={(value) => setData('group_max_participants', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el límite" />
                    </SelectTrigger>
                    <SelectContent>
                      {[2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} participantes
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <InputError message={errors.group_max_participants} />
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">📋 Información importante:</h5>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Al crear el grupo, recibirás un código único de 8 caracteres</li>
                  <li>• Comparte este código con otros estudiantes para que se unan</li>
                  <li>• Solo se permitirán el número de participantes que especifiques</li>
                  <li>• Como líder, serás responsable de coordinar el equipo</li>
                </ul>
              </div>
            </div>
          )}

          {/* Código de Grupo */}
          {data.participation_type === 'join_group' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="join_group_code">Código del Grupo *</Label>
                <Input
                  id="join_group_code"
                  type="text"
                  value={data.join_group_code}
                  onChange={(e) => {
                    const code = e.target.value.toUpperCase();
                    setData('join_group_code', code);
                    if (code.length === 8) {
                      verifyGroupCode(code);
                    } else {
                      setGroupInfo(null);
                    }
                  }}
                  placeholder="Ingresa el código de 8 caracteres"
                  maxLength={8}
                  className="w-full font-mono text-center text-lg tracking-widest"
                />
                <InputError message={errors.join_group_code} />
                <p className="text-sm text-gray-500">
                  Solicita el código al líder del grupo al que quieres unirte
                </p>
              </div>

              {/* Estado de verificación */}
              {verifyingCode && (
                <div className="flex items-center justify-center p-4 border rounded-lg bg-blue-50">
                  <LoaderCircle className="h-4 w-4 animate-spin mr-2 text-blue-600" />
                  <span className="text-blue-800">Verificando código...</span>
                </div>
              )}

              {/* Información del grupo encontrado */}
              {groupInfo && !verifyingCode && (
                <div className={`p-4 border rounded-lg ${groupInfo.is_full ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${groupInfo.is_full ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <div className="flex-1">
                      <h5 className={`font-medium ${groupInfo.is_full ? 'text-red-900' : 'text-green-900'}`}>
                        {groupInfo.group_name}
                      </h5>
                      <p className={`text-sm ${groupInfo.is_full ? 'text-red-700' : 'text-green-700'}`}>
                        Líder: {groupInfo.leader_name}
                      </p>
                      <p className={`text-sm ${groupInfo.is_full ? 'text-red-700' : 'text-green-700'}`}>
                        Participantes: {groupInfo.current_members}/{groupInfo.max_participants}
                        {groupInfo.available_spots > 0 && ` (${groupInfo.available_spots} espacios disponibles)`}
                      </p>
                      {groupInfo.is_full && (
                        <p className="text-sm text-red-700 font-medium mt-1">
                          ⚠️ Este grupo ha alcanzado su límite máximo de participantes
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Error si el código no es válido */}
              {data.join_group_code.length === 8 && !groupInfo && !verifyingCode && (
                <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                  <p className="text-sm text-red-700">
                    ❌ Código de grupo inválido. Verifica que hayas ingresado correctamente el código.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Información del Participante */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900 border-b pb-2">
              Información del Participante
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Nombre Completo *</Label>
                <Input
                  id="full_name"
                  type="text"
                  value={data.full_name}
                  onChange={(e) => setData('full_name', e.target.value)}
                  placeholder="Tu nombre completo"
                  className="w-full"
                />
                <InputError message={errors.full_name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="tu.email@ejemplo.com"
                  className="w-full"
                />
                <InputError message={errors.email} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone_number">Número de Teléfono *</Label>
              <Input
                id="phone_number"
                type="tel"
                value={data.phone_number}
                onChange={(e) => setData('phone_number', e.target.value)}
                placeholder="+57 300 123 4567"
                className="w-full"
              />
              <InputError message={errors.phone_number} />
            </div>
          </div>

          {/* Información del Prototipo - Solo para individuales y líderes */}
          {(data.participation_type === 'individual' || data.participation_type === 'leader') && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 border-b pb-2">
                Información del Prototipo
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prototype_price">Precio del Prototipo (COP) *</Label>
                  <Input
                    id="prototype_price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={data.prototype_price}
                    onChange={(e) => setData('prototype_price', e.target.value)}
                    placeholder="1000000"
                    className="w-full"
                  />
                  <InputError message={errors.prototype_price} />
                  <p className="text-sm text-gray-500">
                    Precio estimado en pesos colombianos
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimated_delivery_days">Tiempo Estimado de Entrega (días) *</Label>
                  <Input
                    id="estimated_delivery_days"
                    type="number"
                    min="1"
                    max="365"
                    value={data.estimated_delivery_days}
                    onChange={(e) => setData('estimated_delivery_days', e.target.value)}
                    placeholder="30"
                    className="w-full"
                  />
                  <InputError message={errors.estimated_delivery_days} />
                  <p className="text-sm text-gray-500">
                    Días laborales estimados para completar el prototipo
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mensaje explicativo para miembros de grupo */}
          {data.participation_type === 'join_group' && groupInfo && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-900">
                    Te unes como miembro del grupo "{groupInfo.group_name}"
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Como miembro del grupo, no necesitas proporcionar información del prototipo. 
                    El líder <strong>{groupInfo.leader_name}</strong> ya ha definido estos detalles para todo el equipo.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Motivación */}
          <div className="space-y-2">
            <Label htmlFor="motivation">
              ¿Por qué quieres participar en este reto? (Opcional)
            </Label>
            <Textarea
              id="motivation"
              value={data.motivation}
              onChange={(e) => setData('motivation', e.target.value)}
              placeholder="Comparte tu motivación para participar..."
              className="min-h-[100px]"
            />
            <InputError message={errors.motivation} />
          </div>

          {/* Botón de Envío */}
          <Button 
            type="submit" 
            disabled={processing || (data.participation_type === 'join_group' && groupInfo?.is_full)}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
            {processing ? 'Inscribiendo...' : 
             data.participation_type === 'join_group' && groupInfo?.is_full ? 'Grupo Lleno - No Disponible' :
             'Inscribirse al Reto'}
          </Button>

          {/* Mostrar código generado */}
          {generatedCode && (
            <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold text-green-900 mb-4 text-center">🎉 ¡Grupo creado exitosamente!</h4>
              <div className="space-y-4">
                <p className="text-green-800 text-center font-medium">Tu código de grupo es:</p>
                
                {/* Código destacado */}
                <div className="relative">
                  <div className="flex items-center justify-center p-6 bg-white border-4 border-green-400 rounded-xl shadow-inner">
                    <span className="text-5xl font-mono font-black text-green-900 tracking-[0.3em] select-all">
                      {generatedCode}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(generatedCode);
                      alert('¡Código copiado al portapapeles!');
                    }}
                    className="absolute top-2 right-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    📋 Copiar
                  </button>
                </div>

                {/* Instrucciones */}
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h5 className="font-bold text-green-900 mb-3">📋 Instrucciones para compartir:</h5>
                  <div className="space-y-2 text-sm text-green-800">
                    <p>✅ <strong>Comparte este código</strong> con otros estudiantes para que se unan a tu grupo</p>
                    <p>👥 <strong>Límite máximo:</strong> {data.group_max_participants || 'N/A'} participantes total</p>
                    <p>⚠️ <strong>Importante:</strong> Guarda este código porque es único para tu grupo</p>
                    <p>📱 <strong>Tip:</strong> Puedes enviarlo por WhatsApp, email o cualquier otro medio</p>
                  </div>
                </div>

                {/* Mensaje de WhatsApp pre-armado */}
                <div className="text-center">
                  <button 
                    onClick={() => {
                      const message = `¡Hola! Te invito a unirte a mi grupo "${data.group_name || 'Mi Grupo'}" en el reto "${challenge.name}". 

Código del grupo: ${generatedCode}

¡Únete y participemos juntos! 🚀`;
                      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    📱 Compartir por WhatsApp
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
