import auth from "@/firebaseConfig/firebase.config";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, } from "firebase/auth";
import { createContext, useEffect, useState } from "react";



export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  // for  created user--------------------
  const register = async (email, password) => {
    try {
      setLoading(true)
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const user = result.user
      if (user) {
        successMsg("Registration successful")

        return user
      }

    } catch (err) {
      const errMsg = err.message
      errorMsg(errMsg)
    } finally {
      setLoading(false)
    }
  }

  // for update user profile-------------------

  const updateUser = async (name, photoUrl) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUrl
      })
      successMsg('user profile updated')

    } catch (err) {
      errorMsg(err.message)
    }
  }

  // for login user----------------

  const login = async (email, password) => {
    try {
      setLoading(true)
      const result = await signInWithEmailAndPassword(auth, email, password)

      const user = result.user
      if (user) {
        successMsg("Login successful")
     
        return user
      }
    } catch (err) {
      errorMsg(err.message)
    }
    finally {
      setLoading(false)
    }
  }
  

  // for logOut -----------------
  const logOut = async () => {
    try {
      setLoading(true)
      await signOut(auth)
      setUser(null)
      successMsg("logout successful")

    } catch (err) {
      errorMsg(err.message)
    }
  }



  //  for reload problem solving and get user info---------
  useEffect(() => {
    const unSubscriber = onAuthStateChanged(auth, (currentUser) => {


      setUser(currentUser)
      setLoading(false)


    })
    return () => unSubscriber()
  }, [])

  const info = {
    register,
    loading,
    user,
    login,
    logOut,
    updateUser
  }
  return (
    <AuthContext.Provider value={info}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;