import {
  useContext,
  createContext,
  useState,
  useEffect
} from 'react';
import {auth} from '../firebase/firebase';
import {createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,signOut,sendPasswordResetEmail,updatePassword} from "firebase/auth"

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider( {
  children
}) {
  const [currentUser,
    setCurrentUser] = useState(null)
  const [loading,
    setLoading] = useState(true)

  function signup(auth,email, password) {
    return createUserWithEmailAndPassword(auth,email, password)
  }

  function login(auth,email, password) {
    return signInWithEmailAndPassword(auth,email, password)
  }

  function logout(auth) {
    return signOut(auth)
  }

  function resetPassword(auth,email) {
    return sendPasswordResetEmail(auth,email);
  }

  function updatePassword(currentUser,password) {
    return updatePassword(currentUser,password)
  }

  useEffect(() => {
     onAuthStateChanged(auth,(user) => {
      setCurrentUser(user)
      setLoading(false);
      })
  }, [])
  let data = {
    signup,
    login,
    logout,
    resetPassword,
    updatePassword,
    currentUser,
    loading
  }
  return (
    <AuthContext.Provider value={data}>
     {children}
    </AuthContext.Provider>
  )
}