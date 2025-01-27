import { FaBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto flex h-screen flex-col justify-between border bg-gray-100">
      <header className="flex h-[6vh] items-center justify-between bg-zinc-950 p-4 text-white">
        <Logo className="text-xl" />
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
        {/* <Dialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        >
          <PostCreate />
        </Dialog>
        <div className="flex items-center justify-center">
          <button onClick={() => setDialogOpen(true)}>
            <FaPlus size={32} />
          </button>
        </div> */}
      </footer>
    </div>
  );
};
