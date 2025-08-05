import { motion } from "framer-motion";

interface StepperDotsProps {
  currentStep: number;
  totalSteps: number;
}

export function StepperDots({ currentStep, totalSteps }: StepperDotsProps) {
  return (
    <div className="flex justify-center gap-2 my-4">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{
            scale: i === currentStep ? 1.2 : 1,
            opacity: i === currentStep ? 1 : 0.5,
            backgroundColor: i === currentStep ? "#F6648B" : "#FFFFFF",
          }}
          className="w-3 h-3 rounded-full"
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
}
