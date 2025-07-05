import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  signup: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('educollab_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role?: UserRole): Promise<boolean> => {
    try {
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('educollab_users') || '[]');
      const existingUser = users.find((u: User & { password: string }) => 
        u.email === email && u.password === password
      );

      if (existingUser) {
        const { password: _, ...userWithoutPassword } = existingUser;
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        localStorage.setItem('educollab_user', JSON.stringify(userWithoutPassword));
        return true;
      }

      // For demo purposes, create a mock user if not found
      const mockUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role: role || 'student',
        bio: `Welcome to EduCollab! I'm a ${role || 'student'} passionate about learning and collaboration.`,
        department: role === 'teacher' ? 'Computer Science' : undefined,
        yearOfStudy: role === 'student' ? 2 : undefined,
        subjects: role === 'teacher' ? ['Computer Science', 'Web Development'] : undefined,
        followers: [],
        following: [],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('educollab_user', JSON.stringify(mockUser));
      
      // Store user in users list
      users.push({ ...mockUser, password });
      localStorage.setItem('educollab_users', JSON.stringify(users));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('educollab_users') || '[]');
      
      // Check if user already exists
      const existingUser = users.find((u: User & { password: string }) => u.email === userData.email);
      if (existingUser) {
        return false; // User already exists
      }

      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'student',
        bio: userData.bio || `Welcome to EduCollab! I'm a ${userData.role || 'student'} passionate about learning and collaboration.`,
        department: userData.department,
        yearOfStudy: userData.yearOfStudy,
        subjects: userData.subjects,
        followers: [],
        following: [],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`
      };

      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('educollab_user', JSON.stringify(newUser));
      
      // Store user with password in users list
      users.push({ ...newUser, password: userData.password });
      localStorage.setItem('educollab_users', JSON.stringify(users));
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('educollab_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('educollab_user', JSON.stringify(updatedUser));
      
      // Update in users list
      const users = JSON.parse(localStorage.getItem('educollab_users') || '[]');
      const userIndex = users.findIndex((u: User) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData };
        localStorage.setItem('educollab_users', JSON.stringify(users));
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      updateUser,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};