
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  fullName: string;
  email: string;
  department: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (user: User & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("rak-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("rak-users") || "[]");
    const userFound = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (userFound) {
      const { password, ...userWithoutPassword } = userFound;
      localStorage.setItem("rak-user", JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = async (userData: User & { password: string }): Promise<boolean> => {
    // Store user in localStorage
    const users = JSON.parse(localStorage.getItem("rak-users") || "[]");
    
    // Check if email already exists
    const emailExists = users.some((u: any) => u.email === userData.email);
    if (emailExists) {
      return false;
    }
    
    // Add new user to users array
    users.push(userData);
    localStorage.setItem("rak-users", JSON.stringify(users));
    
    // Auto-login after signup
    const { password, ...userWithoutPassword } = userData;
    localStorage.setItem("rak-user", JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("rak-user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
