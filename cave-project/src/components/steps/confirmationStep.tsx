import React from 'react';
import { useBid, formatCurrency } from '../../context/bidContext';
import ActionButton from '../actionButton';

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="border-b border-gray-700 py-3 sm:py-4">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-base sm:text-lg font-semibold text-white">{value}</p>
  </div>
);

const ConfirmationStep = () => {
  const { bidValue, userData, setCurrentStep, currentStep, confirmAndPlaceBid } = useBid();

  const handleConfirm = () => {
    confirmAndPlaceBid();
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="flex flex-col items-center text-white w-full">
      {/* ADAPTAÇÃO RESPONSIVA: Tamanho da fonte ajustado. */}
      <h2 className="text-2xl sm:text-3xl font-bold my-8">CONFIRMAÇÃO</h2>
      <div className="w-full text-left">
        <DetailItem label="Nome:" value={userData.name} />
        <DetailItem label="CPF:" value={userData.cpf} />
        <DetailItem label="Contato:" value={userData.phone} />
        <DetailItem label="Valor do Lance:" value={formatCurrency(bidValue)} />
      </div>
      {/* ADAPTAÇÃO RESPONSIVA: Botões empilham em ecrãs pequenos. */}
      <div className="w-full flex flex-col sm:flex-row gap-4 mt-12">
        <button onClick={() => setCurrentStep(currentStep - 1)} className="w-full bg-transparent border-2 border-[#F6648B] text-[#F6648B] font-bold py-4 px-6 rounded-full text-lg hover:bg-[#F6648B]/10 transition-colors">
          &larr; Corrigir
        </button>
        <ActionButton onClick={handleConfirm}>Avançar &rarr;</ActionButton>
      </div>
    </div>
  );
};

export default ConfirmationStep;
