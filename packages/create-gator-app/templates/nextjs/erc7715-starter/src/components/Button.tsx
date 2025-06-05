import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    'w-fit px-10 py-3 font-semibold text-white bg-gradient-to-br from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 rounded-lg cursor-pointer transition-all duration-200 ease-in-out shadow-md min-h-12 inline-flex items-center justify-center border-none disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
