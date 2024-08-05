import Button from '@/components/Elements/Button';
import Input from '@/components/Elements/Input';
import { GuestLayout } from '@/components/Layouts/GuestLayout';
import { Logo } from '@/components/Logo';
import authService from '@/services/authService';
import { setToken } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { T_RegUser } from '@/types';
import formData from '@/utils/formData';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export const RegPage = () => {
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T_RegUser>();

  const onSubmit = async (data: T_RegUser) => {
    if (error) {
      setError('');
    }
    const res = await authService.register(formData(data));
    if (res.access_token) {
      dispatch(setToken(res.access_token));
      navigate('/');
    } else {
      if (res.message) {
        setError(res.message);
      }
    }
  };

  return (
    <GuestLayout>
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-[320px]">
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>
          <form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter full name"
              {...register('name', {
                required: {
                  value: true,
                  message: 'Name is required',
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/i,
                  message: 'Invalid name',
                },
              })}
              error={errors.name?.message?.toString()}
            />
            <Input
              label="Email"
              type="text"
              placeholder="Enter email"
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required',
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={errors.email?.message?.toString()}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required',
                },
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={errors.password?.message?.toString()}
            />
            {error && (
              <div className="rounded-md border border-red-400 bg-red-50 p-2 text-sm text-red-500">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
            >
              Create Account
            </Button>
          </form>
          <p className="mt-8 text-center">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-rose-600"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </GuestLayout>
  );
};
