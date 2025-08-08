import { useEffect } from 'react';
import { useBid } from '../../context/bidContext';

const ThankYouStep = () => {
  const { resetForm } = useBid();

  useEffect(() => {
    const timer = setTimeout(() => {
      resetForm();
    }, 5000);
    return () => clearTimeout(timer);
  }, [resetForm]);

  return (
    <div className="flex flex-col items-center justify-center text-white text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mt-8">OBRIGADO POR CONTRIBUIR!</h2>
    </div>
  );
};

export default ThankYouStep;
