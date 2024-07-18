import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Dialog = ({
  dialogOpen,
  setDialogOpen,
  children,
}: {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`relative z-10 ${dialogOpen ? 'block' : 'hidden'}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-zinc-950 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-zinc-950 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <button
                onClick={() => setDialogOpen(false)}
                className="absolute right-0 top-0 p-4"
              >
                <FaTimes size={20} />
              </button>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
