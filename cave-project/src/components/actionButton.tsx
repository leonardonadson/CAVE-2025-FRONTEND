import { type ReactNode } from "react";

interface ActionButtonProps {
  onClick: () => void | Promise<void>;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
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
    className={`w-full flex items-center justify-center gap-2 bg-[#F6648B] text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg shadow-[#f6648b]/20 transition-all duration-300 hover:brightness-110 active:brightness-125 disabled:bg-gray-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:brightness-100 cursor-pointer ${className}`}
  >
    {children}
  </button>
);

export default ActionButton;