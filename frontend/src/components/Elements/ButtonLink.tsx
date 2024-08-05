import React from 'react';
import { Link } from 'react-router-dom';

type T_ButtonLink = {
  children: React.ReactNode;
  to: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export const ButtonLink = ({ children, to = 'button', className, ...props }: T_ButtonLink) => {
  return (
    <Link
      to={to}
      className={`inline-block rounded-lg bg-rose-600 px-4 py-1.5 text-center font-semibold text-white disabled:bg-slate-400 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};
