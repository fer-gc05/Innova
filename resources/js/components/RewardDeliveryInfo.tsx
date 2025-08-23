import React from 'react';
import { Package, Award } from 'lucide-react';

interface RewardDeliveryInfoProps {
  rewardDeliveryType: 'prototype' | 'final_software';
  rewardDeliveryDetails?: string;
  className?: string;
}

export default function RewardDeliveryInfo({
  rewardDeliveryType,
  rewardDeliveryDetails,
  className = ''
}: RewardDeliveryInfoProps) {
  const getDeliveryIcon = () => {
    return rewardDeliveryType === 'prototype' ? Package : Award;
  };

  const getDeliveryLabel = () => {
    return rewardDeliveryType === 'prototype' ? 'Por Prototipo' : 'Por Software Final';
  };

  const getDeliveryDescription = () => {
    return rewardDeliveryType === 'prototype'
      ? 'La recompensa se entregará cuando el estudiante presente el prototipo inicial'
      : 'La recompensa se entregará cuando se complete y entregue el software final';
  };

  const Icon = getDeliveryIcon();

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            rewardDeliveryType === 'prototype'
              ? 'bg-orange-100 text-orange-600'
              : 'bg-purple-100 text-purple-600'
          }`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {getDeliveryLabel()}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {getDeliveryDescription()}
          </p>

          {rewardDeliveryDetails && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Detalles de Entrega
              </h4>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-md p-3">
                {rewardDeliveryDetails}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
