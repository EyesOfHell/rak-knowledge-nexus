
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import AppSidebar from '@/components/AppSidebar';
import { AuthProvider } from '@/hooks/useAuth';

const ProtectedLayout = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <AuthProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:h-full">
          <AppSidebar />
        </div>
        <div className="md:ml-64 flex flex-col flex-1 w-full">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default ProtectedLayout;
