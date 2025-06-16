import auth from "@/firebaseConfig/firebase.config";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)


  // for  created user--------------------
  const register = async (email, password) => {
    try {
      setLoading(true)
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const user = result.user
      if (user) {
        successMsg("Registration successful")
        setUser(user)
        return user
      }
    } catch (err) {
      const errMsg = err.message
      errorMsg(errMsg)
    } finally {
      setLoading(false)
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
        setUser(user)
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
   const logOut =async()=>{
        try{
            await signOut(auth)
            setUser(null)
            successMsg("logout successful")
           
        }catch(err){
            errorMsg(err.message)
        }
   }
  const info = {
    register,
    loading,
    user,
    login,
    logOut
  }
  return (
    <AuthContext.Provider value={info}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;