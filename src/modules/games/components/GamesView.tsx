import React from 'react';
import LandscapeHeader from '@/components/layout/LandscapeHeader';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import Card from '@/components/ui/Card';

interface GamesViewProps {
  onBack: () => void;
}

export const GamesView: React.FC<GamesViewProps> = ({ onBack }) => {
  return (
    <ResponsiveContainer maxWidth="max-w-[1024px]" className="p-0 sm:p-2 md:p-3">
      <div className="w-full h-full bg-[var(--color-bg-panel)] rounded-0 sm:rounded-[12px] overflow-hidden flex flex-col justify-between p-3 sm:p-5 shadow-2xl border border-white/10 select-none">
        <LandscapeHeader title="Juegos y Trivia" onBack={onBack} backLabel="Volver" />
        <div className="my-auto w-full max-w-md mx-auto p-2">
          <Card title="Trivia Histórica">
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
              Pon a prueba tus conocimientos sobre la historia y monumentos de Villa de Leyva.
            </p>
          </Card>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default GamesView;
