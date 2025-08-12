import { useEffect, useState } from 'react';
import { useBid } from '../../context/bidContext';

const ThankYouStep = () => {
  const { resetForm } = useBid();

  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown <= 0) {
      resetForm();
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, resetForm]);

  return (
    <div className="flex flex-col items-center justify-center text-white text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mt-8">OBRIGADO POR CONTRIBUIR!</h2>
      <span className="text-lg text-[#F6648B] font-bold mt-6">Redirecionando em {countdown}...</span>
    </div>
  );
};

export default ThankYouStep;
