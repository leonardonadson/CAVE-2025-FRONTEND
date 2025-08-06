import React from 'react';
import { motion } from 'framer-motion';
import { useBid } from '../context/bidContext';

const StepperDots = () => {
  const { currentStep, totalSteps } = useBid();
  return (
    <div className="flex justify-center gap-3 my-4">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: i === currentStep ? 1.2 : 1,
            backgroundColor: i === currentStep ? "#F6648B" : "#4B5563",
          }}
          className="w-3 h-3 rounded-full"
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
};

export default StepperDots;
