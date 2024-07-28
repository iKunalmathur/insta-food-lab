import React from 'react';

type T_Button = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export const Button = ({ children, type = 'button', disabled, className, ...props }: T_Button) => {
  return (
    <button
      type={type}
      className={`rounded-lg bg-rose-600 px-4 py-1.5 text-center font-semibold text-white disabled:bg-slate-400 ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
