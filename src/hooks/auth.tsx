import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
    logOut():void;
    loading: boolean;
}

interface Request {
  token: string;
  userWithoutPassword: object;
}

interface AuthState {
  token: string;
  userWithoutPassword: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  

  const [ data, setData] = useState<AuthState>({} as AuthState);
  const [ loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoraged = async(): Promise<void> => {
      const token = await AsyncStorage.getItem('@GoBarber:token');
      const userWithoutPassword = await AsyncStorage.getItem('@GoBarber:user');
     
      if(token && userWithoutPassword){
        setData({ token, userWithoutPassword: JSON.parse(userWithoutPassword)});
      }
      setLoading(false);
    }

    loadStoraged();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post<Request>('/sessions', { email, password });
    
    const { token, userWithoutPassword } = response.data;

    await AsyncStorage.setItem('@GoBarber:token', token);
    await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(userWithoutPassword));

    setData({ token, userWithoutPassword});

  }, [])

  const logOut = useCallback(async () => {
    await AsyncStorage.removeItem('@GoBarber:token');
    await AsyncStorage.removeItem('@GoBarber:user');
    setData( {} as AuthState );

  }, [])

  return (
      <AuthContext.Provider value={{ user: data.userWithoutPassword , signIn, logOut, loading }}>
        {children}
      </AuthContext.Provider>
  )
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context){
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context;
}

