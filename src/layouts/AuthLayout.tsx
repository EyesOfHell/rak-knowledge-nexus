
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';

const AuthLayout = () => {
  const { user } = useAuth();

  // If user is already logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-background to-muted p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="mb-8 text-center">
        <Link to="/">
          <h1 className="text-4xl font-bold mb-2 text-primary">RAK Knowledge Hub</h1>
        </Link>
        <p className="text-muted-foreground">Your internal resource center</p>
      </div>
      
      <Card className="w-full max-w-md p-6 shadow-lg">
        <Outlet />
      </Card>
    </div>
  );
};

import { Link } from 'react-router-dom';

export default AuthLayout;
