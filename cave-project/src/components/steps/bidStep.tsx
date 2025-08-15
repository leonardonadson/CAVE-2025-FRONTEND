import { useEffect, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useBid, formatCurrency } from '../../context/bidContext';
import ActionButton from '../actionButton';

const BidStep = () => {
  const { bidValue, setBidValue, highestBid, setCurrentStep, currentStep } = useBid();
  const [minValue, setMinValue] = useState(800);

  useEffect(() => {
    if (highestBid && highestBid + 100 > minValue) {
      setMinValue(highestBid + 100);
      if (bidValue < highestBid + 100) setBidValue(highestBid + 100);
    }
  }, [highestBid]);

  const handleIncrement = () => setBidValue(bidValue + 100);
  const handleDecrement = () => setBidValue(Math.max(minValue, bidValue - 100));
  const quickAdd = (amount: number) => setBidValue(bidValue + amount);

  const quickAddValues = [200, 500, 1000, 2000];

  return (
    <div className="flex flex-col items-center text-white w-full">
      {minValue > 800 && (
        <div className="text-center mt-6">
          <p className="text-base sm:text-lg text-gray-300">Último lance</p>
          <h2 className="text-4xl sm:text-5xl font-bold">{formatCurrency(highestBid)}</h2>
        </div>
      )}

      <p className="font-semibold mb-4 mt-8 text-sm sm:text-base">INSIRA O VALOR DO LANCE ABAIXO</p>

      <div className="bg-gray-800/50 flex items-center justify-between w-full p-2 rounded-full my-4">
        <button onClick={handleDecrement} disabled={bidValue <= minValue} className="p-3 sm:p-4 bg-gray-700 rounded-full text-white disabled:opacity-50 transition-opacity">
          <Minus size={24} />
        </button>
        <span className="text-2xl sm:text-3xl font-bold mx-2 sm:mx-4 flex-1 text-center">{formatCurrency(bidValue)}</span>
        <button onClick={handleIncrement} className="p-3 sm:p-4 bg-gray-700 rounded-full text-white">
          <Plus size={24} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full my-4">
        {quickAddValues.map((val) => (
          <button
            key={val}
            onClick={() => quickAdd(val)}
            className="text-sm sm:text-base border-2 border-gray-600 text-gray-300 rounded-full py-2 px-4 hover:bg-gray-700 hover:border-gray-500 transition-colors"
          >
            +{formatCurrency(val).replace("R$", "")}
          </button>
        ))}
      </div>

      <div className="w-full mt-6">
        <ActionButton onClick={() => setCurrentStep(currentStep + 1)}>Avançar</ActionButton>
      </div>
    </div>
  );
};

export default BidStep;
