import React from 'react';
import LandscapeHeader from '@/components/layout/LandscapeHeader';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import Card from '@/components/ui/Card';

interface ARViewProps {
  onBack: () => void;
}

export const ARView: React.FC<ARViewProps> = ({ onBack }) => {
  return (
    <ResponsiveContainer maxWidth="max-w-[1024px]" className="p-0 sm:p-2 md:p-3">
      <div className="w-full h-full bg-[var(--color-bg-panel)] rounded-0 sm:rounded-[12px] overflow-hidden flex flex-col justify-between p-3 sm:p-5 shadow-2xl border border-white/10 select-none">
        <LandscapeHeader title="Realidad Aumentada AR" onBack={onBack} backLabel="Volver" />
        <div className="my-auto w-full max-w-md mx-auto p-2">
          <Card title="Escáner AR de Fósiles">
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
              Apunta tu cámara hacia los puntos de interés para visualizar dinosaurios y fósiles en 3D en Villa de Leyva.
            </p>
          </Card>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default ARView;
