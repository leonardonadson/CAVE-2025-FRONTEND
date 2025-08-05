import { StepperDots } from "../../components/stepperDots";
import { useState } from "react";

export default function BidPage() {
  const [currentStep, setCurrentStep] = useState(0); // começa no passo 0
  const totalSteps = 4;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Página de Lance</h1>
      <StepperDots currentStep={currentStep} totalSteps={totalSteps} />

      <div className="my-6">
        {currentStep === 0 && <p>Passo 1: Inserir lance</p>}
        {currentStep === 1 && <p>Passo 2: Dados pessoais</p>}
        {currentStep === 2 && <p>Passo 3: Confirmar dados</p>}
        {currentStep === 3 && <p>Passo 4: Agradecimento</p>}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep((s) => Math.max(s - 1, 0))}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Voltar
        </button>

        <button
          onClick={() => setCurrentStep((s) => Math.min(s + 1, totalSteps - 1))}
          disabled={currentStep === totalSteps - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Avançar
        </button>
      </div>
    </div>
  );
}
