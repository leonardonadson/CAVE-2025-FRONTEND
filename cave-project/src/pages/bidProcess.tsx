import { motion, AnimatePresence } from "framer-motion";
import { useBid } from "../context/bidContext";

import BidStep from "../components/steps/bidStep";
import PersonalDataStep from "../components/steps/personalDataStep";
import ConfirmationStep from "../components/steps/confirmationStep";
import ThankYouStep from "../components/steps/thankYouStep";
import StepperDots from "../components/stepperDots";
import logoCave from "../assets/logo-cave-branco.png";
import tocandoAVida from "../assets/tocando-a-vida.png";
import ifrnLogo from "../assets/ifrn.png";
import csaLogo from "../assets/logo-csa-por-extenso.png";

const BidProcess = () => {
  const { currentStep } = useBid();
  
  

  const steps = [
    <BidStep />,
    <PersonalDataStep />,
    <ConfirmationStep />,
    <ThankYouStep />,
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
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-black/25 p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/10 flex flex-col">
        <img
          src={logoCave}
          alt="Logo Principal"
          className="w-40 sm:w-48 mx-auto"
        />
        <main className="flex-grow">
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
        <footer className="w-full pt-6">
          <StepperDots />
          <div className="mt-8 flex flex-col items-center">
            <img
              src={tocandoAVida}
              alt="Patrocinador 1"
              className="w-28 sm:w-32 mb-4"
            />
            <div className="flex gap-6">
              <img
                src={ifrnLogo}
                alt="Patrocinador 2"
                className="w-24 sm:w-28"
              />
              <img
                src={csaLogo}
                alt="Patrocinador 3"
                className="w-24 sm:w-28"
              />
            </div>
          </div>
        </footer>
      </div>
    </div>
    
  );
};

export default BidProcess;
