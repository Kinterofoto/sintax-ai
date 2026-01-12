import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyle = "group relative inline-flex items-center justify-center px-8 py-3 font-mono text-sm uppercase tracking-widest transition-all duration-300 focus:outline-none";
  
  const variants = {
    primary: "bg-white text-black hover:bg-cement hover:text-white border border-transparent",
    outline: "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      <span className="mr-2">{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
};