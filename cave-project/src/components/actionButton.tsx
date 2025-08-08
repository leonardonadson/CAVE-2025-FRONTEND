import { type ReactNode } from "react";

interface ActionButtonProps {
  onClick: () => void | Promise<void>; // Aceita tanto void quanto Promise<void>
  children: ReactNode;
  disabled?: boolean;
  className?: string; // Adicionando className opcional
}

const ActionButton = ({
  onClick,
  children,
  disabled = false,
  className = "",
}: ActionButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex items-center justify-center gap-2 bg-[#F6648B] text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg shadow-[#f6648b]/20 hover:scale-105 transition-transform duration-300 disabled:bg-gray-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
  >
    {children}
  </button>
);

export default ActionButton;
