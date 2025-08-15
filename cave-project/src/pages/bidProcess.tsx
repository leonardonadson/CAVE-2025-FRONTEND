import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
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
  const { currentStep, allBids } = useBid();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api");
    }, 30000);
    return () => clearInterval(interval);
  }, []);

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
        <div className="w-full max-w-2xl xl:max-w-3xl bg-black/25 p-8 sm:p-12 rounded-2xl shadow-2xl border border-white/10 flex flex-col">
          <div className="flex flex-row items-center justify-center gap-8 mb-8">
            <img
              src={logoCave}
              alt="Logo CAVE"
              className="w-40 sm:w-48"
            />
            <img
              src={tocandoAVida}
              alt="Logo Tocando a Vida"
              className="w-40 sm:w-48"
            />
          </div>
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
          <footer className="w-full pt-10">
            <StepperDots />
            <div className="mt-12 flex flex-col items-center">
              <div className="flex gap-12 justify-center">
                <img
                  src={ifrnLogo}
                  alt="Logo IFRN"
                  className="w-36 sm:w-44 object-contain"
                />
                <img
                  src={csaLogo}
                  alt="Logo CSA"
                  className="w-36 sm:w-44"
                />
              </div>
            </div>
          </footer>
        </div>
      </div>
    
  );
};

export default BidProcess;
