import { useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("✅ Signed in user:", user.displayName, user.email);
    return user;
  } catch (error) {
    console.error("❌ Google Sign-In failed:", error);
    alert("Google Sign-In failed. Check console for details.");
    throw error;
  }
};

  const logout = () => signOut(auth);

  return { user, loading, signInWithGoogle, logout };
};