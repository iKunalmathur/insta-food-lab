import { config } from '@/config';
import { Link } from 'react-router-dom';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      to="/"
      className={`text-3xl font-bold text-rose-600 ${className}`}
    >
      {config.app.name}
    </Link>
  );
};
