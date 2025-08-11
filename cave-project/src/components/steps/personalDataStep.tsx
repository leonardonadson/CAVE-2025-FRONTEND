import { useMemo, useState, type ChangeEvent } from 'react';
import { useBid } from '../../context/bidContext';
import ActionButton from '../actionButton';

const PersonalDataStep = () => {
  const { userData, setUserData, setCurrentStep, currentStep } = useBid();
  const [errors, setErrors] = useState<{ name?: string; cpf?: string; phone?: string }>({});

  // Validação real de CPF
  function validateCPF(cpf: string) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
    let sum = 0, rest;
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  }

  // Validação real de telefone brasileiro (celular)
  function validatePhone(phone: string) {
    const phoneDigits = phone.replace(/\D/g, '');
    // DDD + 9 dígitos (celular)
    return /^\d{2}9\d{8}$/.test(phoneDigits);
  }

  function validateName(name: string) {
    const regex = /^([A-Za-zÀ-ú\s'-]+( [A-Za-zÀ-ú\s'-]+)*)$/;
    return regex.test(name.trim()) && name.trim().split(' ').length >= 2;
  }

  const isFormValid = useMemo(() => {
    const nameValid = validateName(userData.name);
    const cpfValid = validateCPF(userData.cpf);
    const phoneValid = validatePhone(userData.phone);
    return nameValid && cpfValid && phoneValid;
  }, [userData]);

  const maskCPF = (value: string) => value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  const maskPhone = (value: string) => value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{4})$/, '$1-$2');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let maskedValue = value;
    let errorMsg = '';
    if (name === 'cpf') {
      maskedValue = maskCPF(value);
      if (maskedValue.length === 14 && !validateCPF(maskedValue)) {
        errorMsg = 'CPF inválido';
      }
    } else if (name === 'phone') {
      maskedValue = maskPhone(value);
      if (maskedValue.length === 15 && !validatePhone(maskedValue)) {
        errorMsg = 'Telefone inválido';
      }
    } else if (name === 'name') {
      if (!validateName(maskedValue)) {
        errorMsg = 'Digite um nome completo válido';
      }
    }
    setUserData({ ...userData, [name]: maskedValue });
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  return (
    <div className="flex flex-col items-center text-white w-full">
      <h2 className="text-2xl sm:text-3xl font-bold my-8">INFORME OS SEUS DADOS</h2>
      <form className="w-full flex flex-col gap-6">
        <div>
          <label className="font-semibold mb-2 block" htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Digite o seu nome completo"
            className={`w-full bg-transparent border-2 rounded-xl p-4 focus:border-[#F6648B] focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
          />
          {errors.name && <span className="text-red-400 text-sm mt-1 block">{errors.name}</span>}
        </div>
        <div>
          <label className="font-semibold mb-2 block" htmlFor="cpf">CPF</label>
          <input
            type="text"
            inputMode="numeric"
            id="cpf"
            name="cpf"
            value={userData.cpf}
            onChange={handleChange}
            placeholder="123.456.789-00"
            maxLength={14}
            className={`w-full bg-transparent border-2 rounded-xl p-4 focus:border-[#F6648B] focus:outline-none ${errors.cpf ? 'border-red-500' : 'border-gray-600'}`}
          />
          {errors.cpf && <span className="text-red-400 text-sm mt-1 block">{errors.cpf}</span>}
        </div>
        <div>
          <label className="font-semibold mb-2 block" htmlFor="phone">Contato</label>
          <input
            type="text"
            inputMode="numeric"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            maxLength={15}
            className={`w-full bg-transparent border-2 rounded-xl p-4 focus:border-[#F6648B] focus:outline-none ${errors.phone ? 'border-red-500' : 'border-gray-600'}`}
          />
          {errors.phone && <span className="text-red-400 text-sm mt-1 block">{errors.phone}</span>}
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
        <ActionButton onClick={() => { if (isFormValid) setCurrentStep(currentStep + 1); }} disabled={!isFormValid}>
          Avançar
        </ActionButton>
      </div>
    </div>
  );
};

export default PersonalDataStep;
