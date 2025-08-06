import React, { useMemo, type ChangeEvent } from 'react';
import { useBid } from '../../context/bidContext';
import ActionButton from '../actionButton';

const PersonalDataStep = () => {
  const { userData, setUserData, setCurrentStep, currentStep } = useBid();

  const isFormValid = useMemo(() => {
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
    return (
      userData.name.trim().split(" ").length >= 2 &&
      cpfPattern.test(userData.cpf) &&
      phonePattern.test(userData.phone)
    );
  }, [userData]);

  const maskCPF = (value: string) => value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  const maskPhone = (value: string) => value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{4})$/, '$1-$2');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let maskedValue = value;
    if (name === 'cpf') maskedValue = maskCPF(value);
    else if (name === 'phone') maskedValue = maskPhone(value);
    setUserData({ ...userData, [name]: maskedValue });
  };

  return (
    <div className="flex flex-col items-center text-white w-full">
      <h2 className="text-2xl sm:text-3xl font-bold my-8">INFORME OS SEUS DADOS</h2>
      <form className="w-full flex flex-col gap-6">
        <div>
          <label className="font-semibold mb-2 block" htmlFor="name">Nome</label>
          <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} placeholder="Digite o seu nome completo" className="w-full bg-transparent border-2 border-gray-600 rounded-xl p-4 focus:border-[#F6648B] focus:outline-none" />
        </div>
        <div>
          <label className="font-semibold mb-2 block" htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" name="cpf" value={userData.cpf} onChange={handleChange} placeholder="123.456.789-00" maxLength={14} className="w-full bg-transparent border-2 border-gray-600 rounded-xl p-4 focus:border-[#F6648B] focus:outline-none" />
        </div>
        <div>
          <label className="font-semibold mb-2 block" htmlFor="phone">Contato</label>
          <input type="text" id="phone" name="phone" value={userData.phone} onChange={handleChange} placeholder="(00) 00000-0000" maxLength={15} className="w-full bg-transparent border-2 border-gray-600 rounded-xl p-4 focus:border-[#F6648B] focus:outline-none" />
        </div>
      </form>
      
      {/* ADAPTAÇÃO: Adicionado botão de "Voltar" e layout de botões ajustado. */}
      <div className="w-full flex flex-col-reverse sm:flex-row gap-4 mt-12">
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="w-full bg-transparent border-2 border-gray-500 text-gray-300 font-bold py-4 px-6 rounded-full text-lg hover:bg-gray-700 hover:border-gray-600 transition-colors"
        >
          &larr; Voltar
        </button>
        <ActionButton onClick={() => setCurrentStep(currentStep + 1)} disabled={!isFormValid}>
          Avançar
        </ActionButton>
      </div>
    </div>
  );
};

export default PersonalDataStep;
