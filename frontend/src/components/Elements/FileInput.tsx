import React, { ForwardedRef, useId } from 'react';
import sampleImage from '@/assets/images/sample-300.png';

type T_FileInput = {
  label: string;
  type?: string; // Made optional since it is not used directly in the component
  placeholder: string;
  previewUrl?: string;
  note?: string; // Made optional to match its usage
  error?: string; // Made optional to match its usage
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const FileInput = React.forwardRef(
  (
    { label, placeholder, previewUrl, note, error, ...props }: T_FileInput,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const inputId = useId();

    return (
      <div>
        <input
          hidden
          id={inputId}
          placeholder={placeholder}
          ref={ref}
          {...props}
          type="file"
        />
        <label
          htmlFor={inputId}
          className="mb-2 inline-block text-sm text-rose-600"
        >
          {label}
        </label>
        <div className="border-1 flex cursor-pointer items-center rounded-md border border-dashed border-zinc-300 bg-white px-2 py-1.5">
          <img
            src={previewUrl || sampleImage}
            alt="image"
            className="h-10 w-10 rounded-md border object-cover"
          />
          <label
            htmlFor={inputId}
            className="flex-1"
          >
            <div className="ml-4 text-left">Upload File</div>
          </label>
        </div>
        {note && !error && <span className="text-xs text-zinc-500">{note}</span>}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  },
);

FileInput.displayName = 'FileInput';

export default FileInput;
