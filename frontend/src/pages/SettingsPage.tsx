import { useAppSelector } from '@/redux/hooks';
import { selectAuthUser } from '@/redux/features/auth/authSlice';
import { FaPenAlt } from 'react-icons/fa';
import { useState } from 'react';
import Input from '@/components/Elements/Input';
import Button from '@/components/Elements/Button';
import { AuthLayout } from '@/components/Layouts/AuthLayout';

const SettingsPage = () => {
  const [enableForm, setEnableForm] = useState('');
  const authUser = useAppSelector(selectAuthUser);

  return (
    <AuthLayout>
      <div className="mt-8 p-4">
        <img
          src={authUser?.avatar}
          alt="profile"
          className="mx-auto h-32 w-32 rounded-full"
        />
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-rose-600">Basic Information</p>
          <button onClick={() => setEnableForm('basic')}>
            <FaPenAlt
              className="text-rose-600"
              size={12}
            />
          </button>
        </div>
        <form className="mt-4">
          <fieldset
            className="space-y-4"
            disabled={enableForm === 'basic' ? false : true}
          >
            {/* name */}
            <Input
              label="Name"
              type="text"
              defaultValue={authUser?.name}
            />
            {/* email */}
            <Input
              label="Email"
              type="email"
              defaultValue={authUser?.email}
            />
            <div className={`flex justify-end space-x-2 ${enableForm === 'basic' ? '' : 'hidden'}`}>
              <Button onClick={() => setEnableForm('')}>Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </fieldset>
        </form>
        <p className="mt-4 text-sm text-rose-600">Change Password</p>
      </div>
    </AuthLayout>
  );
};

export default SettingsPage;
