import { createContext } from "react";
import type { User, UserCredential } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signInWithEmail: (email: string, password: string) => Promise<UserCredential>;
  registerWithEmail: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  googleSignIn: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  updateUserProfile: (
    displayName: string,
    photoURL?: string | null
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
