
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Department } from '@/lib/types';

type User = {
  id: string;
  fullName: string;
  email: string;
  department: Department;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string, department: Department) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('rak-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // In a real app, these functions would call an API
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Mock authentication (replace with actual API call)
      if (password.length < 6) {
        throw new Error('Invalid credentials');
      }
      
      // For demo purposes, create a mock user based on the email
      const mockUser: User = {
        id: '1',
        fullName: email.split('@')[0],
        email,
        department: 'engineering',
      };
      
      // Store user in localStorage
      localStorage.setItem('rak-user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (fullName: string, email: string, password: string, department: Department) => {
    try {
      setIsLoading(true);
      
      // Mock signup (replace with actual API call)
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        fullName,
        email,
        department,
      };
      
      // Store user in localStorage
      localStorage.setItem('rak-user', JSON.stringify(newUser));
      setUser(newUser);
      
      toast({
        title: "Account Created!",
        description: "Your account has been created successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: error instanceof Error ? error.message : "An error occurred during sign up",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('rak-user');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
