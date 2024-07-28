import { FaPlus } from 'react-icons/fa6';

const BottomDrawer = ({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`absolute bottom-0 left-0 h-screen w-full bg-zinc-50 bg-opacity-50 transition-opacity ${isOpen ? 'block' : 'hidden'}`}
    >
      <div className="absolute bottom-0 left-0 w-full bg-white p-1 shadow-lg">
        <div className="flex items-center justify-center">
          <button onClick={() => setIsOpen(false)}>
            <FaPlus
              className="mt-[-1.5rem] rotate-45 cursor-pointer rounded-full border-2 border-rose-600 bg-zinc-50 p-1 text-rose-600"
              size={42}
            />
          </button>
        </div>
        <div className="mt-4 min-h-[80vh] overflow-scroll pb-4">{children}</div>
      </div>
    </div>
  );
};

export default BottomDrawer;
