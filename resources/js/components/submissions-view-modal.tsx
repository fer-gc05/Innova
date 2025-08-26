import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, User, Edit, Eye, Award, Calendar, DollarSign } from 'lucide-react';
import InputError from '@/components/input-error';

interface Props {
  challenge: any;
  submissions: any[];
  groupMembers: any[];
  isOpen: boolean;
  onClose: () => void;
  onEditSubmission: () => void;
}

export default function SubmissionsViewModal({ challenge, submissions, groupMembers, isOpen, onClose, onEditSubmission }: Props) {
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'updating' | 'success' | 'error'>('idle');

  const { data, setData, put, processing, errors, reset } = useForm({
    prototype_price: '',
    estimated_delivery_days: '',
    motivation: '',
  });

  const handleEditSubmission = (submission: any) => {
    setSelectedSubmission(submission);
    setData({
      prototype_price: submission.prototype_price?.toString() || '',
      estimated_delivery_days: submission.estimated_delivery_days?.toString() || '',
      motivation: submission.motivation || '',
    });
    setShowEditForm(true);
  };

  const handleUpdateSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateStatus('updating');

    put(`/student/challenges/${challenge.id}/submission/update`, {
      onSuccess: () => {
        setUpdateStatus('success');
        setShowEditForm(false);
        setSelectedSubmission(null);
        reset();
        // Recargar la página para mostrar los datos actualizados
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      onError: (errors: any) => {
        console.error('Error al actualizar:', errors);
        setUpdateStatus('error');
      },
      onFinish: () => {
        // Asegurar que el botón se habilite después de la respuesta
      },
    });
  };

  const getParticipationTypeLabel = (type: string) => {
    switch (type) {
      case 'individual': return 'Individual';
      case 'leader': return 'Líder de Grupo';
      case 'join_group': return 'Miembro de Grupo';
      default: return type;
    }
  };

  const getParticipationTypeColor = (type: string) => {
    switch (type) {
      case 'individual': return 'bg-blue-100 text-blue-800';
      case 'leader': return 'bg-green-100 text-green-800';
      case 'join_group': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-5xl max-h-[85vh] overflow-y-auto bg-white border border-gray-200 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Propuestas de Inscripción - {challenge.name}
          </DialogTitle>
        </DialogHeader>

        {showEditForm && selectedSubmission ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Editar Mi Propuesta
              </h3>
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditForm(false);
                  setSelectedSubmission(null);
                }}
              >
                Cancelar
              </Button>
            </div>

            <form onSubmit={handleUpdateSubmission} className="space-y-4">
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

              <div>
                <Label htmlFor="motivation">Motivación para Participar</Label>
                <Textarea
                  id="motivation"
                  value={data.motivation}
                  onChange={(e) => setData('motivation', e.target.value)}
                  placeholder="Cuéntanos por qué te interesa este reto..."
                  rows={4}
                />
                {errors.motivation && <InputError message={errors.motivation} />}
              </div>

              {updateStatus === 'success' && (
                <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  ¡Propuesta actualizada exitosamente!
                </div>
              )}

              {updateStatus === 'error' && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  Error al actualizar la propuesta. Por favor, intenta de nuevo.
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowEditForm(false);
                    setSelectedSubmission(null);
                    setUpdateStatus('idle');
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={processing || updateStatus === 'updating'}
                >
                  {updateStatus === 'updating' ? 'Actualizando...' :
                   updateStatus === 'success' ? '¡Actualizado!' :
                   'Actualizar Propuesta'}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold">{submissions.length}</div>
                      <div className="text-sm text-gray-600">Total Propuestas</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold">
                        {submissions.filter(s => s.participation_type === 'individual').length}
                      </div>
                      <div className="text-sm text-gray-600">Individuales</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold">
                        {submissions.filter(s => s.participation_type === 'leader').length}
                      </div>
                      <div className="text-sm text-gray-600">Grupos</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Propuestas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Todas las Propuestas
              </h3>

              {submissions.map((submission) => {
                // Obtener miembros del grupo si es líder
                const groupMembersForSubmission = groupMembers.filter(
                  member => member.challenge_student_id === submission.id
                );

                return (
                  <Card key={submission.id} className="border-gray-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            {submission.participation_type === 'individual' ? (
                              <User className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Users className="w-4 h-4 text-green-600" />
                            )}
                            <span className="font-medium">{submission.full_name}</span>
                          </div>
                          <Badge className={getParticipationTypeColor(submission.participation_type)}>
                            {getParticipationTypeLabel(submission.participation_type)}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(submission.created_at)}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Información del prototipo */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <div>
                            <div className="text-sm text-gray-500">Precio</div>
                            <div className="font-medium">{formatCurrency(submission.prototype_price)}</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-500">Entrega</div>
                            <div className="font-medium">{submission.estimated_delivery_days} días</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-purple-600" />
                          <div>
                            <div className="text-sm text-gray-500">Estado</div>
                            <div className="font-medium capitalize">{submission.status}</div>
                          </div>
                        </div>
                      </div>

                      {/* Información del grupo si es líder */}
                      {submission.participation_type === 'leader' && submission.group_name && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-blue-900">Grupo: {submission.group_name}</span>
                          </div>
                          <div className="text-sm text-blue-800">
                            <div>Código: <span className="font-mono">{submission.group_code}</span></div>
                            <div>Miembros: {groupMembersForSubmission.length + 1}/{submission.group_max_participants}</div>
                            {groupMembersForSubmission.length > 0 && (
                              <div className="mt-2">
                                <div className="font-medium">Miembros:</div>
                                <ul className="list-disc list-inside space-y-1">
                                  {groupMembersForSubmission.map((member) => (
                                    <li key={member.id} className="text-sm">
                                      {member.full_name} ({member.email})
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Motivación */}
                      {submission.motivation && (
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">Motivación:</div>
                          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {submission.motivation}
                          </div>
                        </div>
                      )}

                      {/* Botones de acción */}
                      <div className="flex justify-end space-x-2 pt-2 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditSubmission(submission)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {submissions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No hay propuestas de inscripción aún.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
