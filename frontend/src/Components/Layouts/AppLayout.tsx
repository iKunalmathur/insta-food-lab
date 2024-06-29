import { FaBell, FaPlusCircle, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex h-screen min-h-screen max-w-sm flex-col justify-between border bg-gray-100">
      <header className="flex h-16 items-center justify-between bg-zinc-950 p-4 text-white">
        <Link to="/">InstaFood Lab</Link>
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
      <main>{children}</main>
      <footer className="mt-auto h-16 bg-zinc-950 p-4 text-white">
        <div className="flex items-center justify-center">
          <Link to="/post/create">
            <FaPlusCircle size={32} />
          </Link>
        </div>
      </footer>
    </div>
  );
};
