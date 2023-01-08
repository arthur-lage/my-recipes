import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { createContext, ReactNode, useState } from "react";
import { auth } from "../services/firebase";

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  photoURL?: string | null;
}

interface AuthContextProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  signInWithGoogle: () => void;
  signUpWithEmail: (email: string, password: string) => void;
  signInWithEmail: (email: string, password: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, provider);

      setCurrentUser({
        id: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function signUpWithEmail(email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!user) {
      return;
    }

    setCurrentUser({
      id: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
    });
  }

  async function signInWithEmail(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    if (!user) {
      return;
    }

    setCurrentUser({
      id: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
    });
  }

  const value = {
    currentUser,
    setCurrentUser,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
