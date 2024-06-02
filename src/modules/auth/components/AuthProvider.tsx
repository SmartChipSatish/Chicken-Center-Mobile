import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextProps {
  userToken: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading:boolean
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = (token: string) => {
    setUserToken(token);
  };

  const logout = () => {
    setUserToken(null);
  };

  const checkUser=async()=>{
     const tocken= await AsyncStorage.getItem('idToken');
     if(tocken){
      setUserToken(tocken);
      }else{
        setUserToken(null);
      }
      setLoading(false);
  }

  useEffect(()=>{
    checkUser();
  },[])

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
