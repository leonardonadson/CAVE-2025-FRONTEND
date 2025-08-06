import { type ReactNode } from 'react';

interface ActionButtonProps {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}

/**
 * Botão de ação principal, customizado com o estilo rosa/magenta do design.
 * Usado para ações primárias como "Avançar".
 */
const ActionButton = ({ onClick, children, disabled = false }: ActionButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-full flex items-center justify-center gap-2 bg-[#F6648B] text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg shadow-[#f6648b]/20 hover:scale-105 transition-transform duration-300 disabled:bg-gray-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
  >
    {children}
  </button>
);

export default ActionButton;
