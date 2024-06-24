import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DevSettings } from 'react-native';

interface AuthContextProps {
  userToken: string | null;
  login: (token: string,userId:string) => void;
  logout: () => void;
  loading:boolean
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = (token: string, userId:string) => {
    AsyncStorage.setItem('idToken', JSON.stringify(token + userId));
    AsyncStorage.setItem('userId', JSON.stringify(userId));
    AsyncStorage.setItem('login', 'true');
    setUserToken(token);
  };

  const logout = async() => {
    await AsyncStorage.clear();
    setUserToken(null);
    DevSettings.reload();
  };

  const checkUser=async()=>{
     const tocken= await AsyncStorage.getItem('idToken');
     const loginCheck= await AsyncStorage.getItem('login');
     setTimeout(() => {
      setLoading(false);
      }, 3000);
      
     if(tocken && Boolean(loginCheck)){
      setUserToken(tocken);
      }else{
        setUserToken(null);
      }
     
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