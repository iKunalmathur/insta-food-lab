import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// useAuth hook
export const useAuth = () => {
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const dispatch = useAppDispatch();
  return { accessToken, dispatch };
};
