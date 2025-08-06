import { useEffect } from 'react';
import { useBid } from '../../context/bidContext';
import Logo from '../logo';

const ThankYouStep = () => {
  const { resetForm } = useBid();

  useEffect(() => {
    const timer = setTimeout(() => {
      resetForm();
    }, 5000);
    return () => clearTimeout(timer);
  }, [resetForm]);

  return (
    // ADAPTAÇÃO RESPONSIVA: O container já é flexível pelo App.tsx.
    <div className="flex flex-col items-center justify-center text-white text-center">
      <Logo />
      {/* ADAPTAÇÃO RESPONSIVA: Tamanho da fonte ajustado. */}
      <h2 className="text-3xl sm:text-4xl font-bold mt-8">OBRIGADO POR CONTRIBUIR!</h2>
    </div>
  );
};

export default ThankYouStep;
