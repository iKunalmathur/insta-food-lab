import { useState } from 'react';
import { FaBell, FaPlus, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Dialog from '@/components/Elements/Dialog';
import { PostCreate } from '@/components/PostCreate';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="relative mx-auto flex h-screen min-h-screen max-w-sm flex-col justify-between border bg-gray-100">
      <header className="flex h-[6vh] items-center justify-between bg-zinc-950 p-4 text-white">
        <Link
          to="/"
          className="font-bold"
        >
          InstaFood Lab
        </Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link to="/notifications">
                <FaBell />
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <FaUserCircle />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="h-[88vh] bg-zinc-900 p-1 text-white">{children}</main>
      <footer className="mt-auto h-[6vh] bg-zinc-950 p-4 text-white">
        <Dialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        >
          <PostCreate />
        </Dialog>
        <div className="flex items-center justify-center">
          <button onClick={() => setDialogOpen(true)}>
            <FaPlus size={32} />
          </button>
        </div>
      </footer>
    </div>
  );
};
