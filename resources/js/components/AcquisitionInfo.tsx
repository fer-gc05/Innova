import React from 'react';
import { FileText, ShoppingCart } from 'lucide-react';

interface AcquisitionInfoProps {
  acquisitionType: 'license' | 'purchase';
  acquisitionDetails?: string;
  acquisitionTerms?: string;
  className?: string;
}

export default function AcquisitionInfo({
  acquisitionType,
  acquisitionDetails,
  acquisitionTerms,
  className = ''
}: AcquisitionInfoProps) {
  const getAcquisitionIcon = () => {
    return acquisitionType === 'license' ? FileText : ShoppingCart;
  };

  const getAcquisitionLabel = () => {
    return acquisitionType === 'license' ? 'Licencia de Software' : 'Compra del Software';
  };

  const getAcquisitionDescription = () => {
    return acquisitionType === 'license'
      ? 'El software se obtendrá mediante una licencia de uso'
      : 'Se adquirirá la propiedad completa del software desarrollado';
  };

  const Icon = getAcquisitionIcon();

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            acquisitionType === 'license'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-green-100 text-green-600'
          }`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {getAcquisitionLabel()}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {getAcquisitionDescription()}
          </p>

          {acquisitionDetails && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Detalles de la Adquisición
              </h4>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-md p-3">
                {acquisitionDetails}
              </p>
            </div>
          )}

          {acquisitionTerms && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Términos y Condiciones
              </h4>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-md p-3">
                {acquisitionTerms}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
