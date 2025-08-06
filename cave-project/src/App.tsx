import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBid } from './context/bidContext';

import BidStep from './components/steps/bidStep';
import PersonalDataStep from './components/steps/personalDataStep';
import ConfirmationStep from './components/steps/confirmationStep';
import ThankYouStep from './components/steps/thankYouStep';
import StepperDots from './components/stepperDots';
import Logo from './components/logo';

const BidProcess = () => {
  const { currentStep, totalSteps } = useBid();

  const steps = [
    <BidStep />, 
    <PersonalDataStep />, 
    <ConfirmationStep />, 
    <ThankYouStep />
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  } as const;

  return (
    
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen w-full flex items-center justify-center p-4">
      
     
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-black/25 p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/10">

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="w-full"
            >
              {steps[currentStep]}
            </motion.div>
          </AnimatePresence>
        </main>
        
        
        {currentStep < totalSteps - 1 && (
          <footer className="w-full pt-6">
            <StepperDots />
            <Logo />
          </footer>
        )}
      </div>
    </div>
  );
};

function App() {
  return <BidProcess />;
}

export default App;
