import React, { useId } from 'react';

type T_Input = {
  label: string;
  type: string;
  placeholder?: string;
  note?: string;
  error?: string;
  [key: string]: any;
};

const Input = React.forwardRef(
  ({ label, type, placeholder, note, error, ...props }: T_Input, ref) => {
    const inputId = useId();
    return (
      <div className="flex flex-col space-y-2">
        <label htmlFor={inputId}>{label}</label>
        <input
          className="border-1 rounded-md border border-zinc-300 bg-white px-2 py-1.5"
          type={type}
          id={inputId}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        {note && !error && <span className="text-xs text-zinc-500">{note}</span>}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  },
);

export default Input;
