import { FaHouse, FaPlus, FaRegBell, FaRegCircleUser } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../Logo';
import {} from 'react-icons/fa6';
import BottomDrawer from '../BottomDrawer';
import { useEffect, useState } from 'react';
import { PostCreate } from '@/components/PostCreate';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAuthUser, selectToken, setAuthUser } from '@/redux/features/auth/authSlice';
import authService from '@/services/authService';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const accessToken = useAppSelector(selectToken);
  const authUser = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchMe() {
      if (!accessToken) {
        navigate('/login');
        return;
      }

      if (!authUser) {
        const res = await authService.me();
        if (res.data) {
          dispatch(setAuthUser(res.data));
        }
      }
    }

    fetchMe();
  }, [accessToken, authUser]);

  return (
    <div className="relative mx-auto flex h-screen flex-col justify-between border bg-zinc-50">
      <header className="flex h-[6vh] items-center justify-between bg-zinc-50 p-4 shadow-sm">
        <Logo className="text-xl" />
        <nav>
          <ul className="flex gap-4 text-rose-600">
            <li>
              <Link to="/notifications">
                <FaRegBell size={20} />
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <FaRegCircleUser size={20} />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="h-[88vh] p-1">{children}</main>
      <footer className="mt-auto h-[6vh] border p-4">
        <BottomDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <PostCreate setIsOpen={setIsOpen} />
        </BottomDrawer>
        <div className="flex items-center justify-center">
          {location.pathname !== '/' ? (
            <Link to={'/'}>
              <FaHouse
                className="mt-[-2.2rem] cursor-pointer rounded-full border-2 border-rose-600 bg-zinc-50 p-1 text-rose-600"
                size={38}
              />
            </Link>
          ) : (
            <button onClick={() => setIsOpen(true)}>
              <FaPlus
                className="mt-[-2.2rem] cursor-pointer rounded-full border-2 border-rose-600 bg-zinc-50 p-1 text-rose-600"
                size={38}
              />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
