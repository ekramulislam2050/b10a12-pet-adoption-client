import auth from "@/firebaseConfig/firebase.config";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

// E&f1990

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
      // successMsg('user profile updated')

    } catch (err) {
      errorMsg(err.message)
    }
  }

  // for login  ----------------

  const login = async (email, password) => {
    try {
      setLoading(true)
      const result = await signInWithEmailAndPassword(auth, email, password)

      const user = result.user
      if (user) {
        // successMsg("Login successful")

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
    }finally{
      setLoading(false)
    }
  }

  //  login by google-----------------
  const provider = new GoogleAuthProvider()
  const loginByGoogle = async () => {
    try {
      setLoading(true)
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      if (user) {
        successMsg("login successful by google")
        return user
      }
    } catch (err) {
      errorMsg(err.message)
    }finally{
      setLoading(false)
    }

  }

  // facebook login----------------------------
     const facebookProvider = new FacebookAuthProvider()
      facebookProvider.addScope("email")
    const loginByFB=async()=>{
        try{
             setLoading(true)
              const result = await signInWithPopup(auth,facebookProvider)
               const user = result.user
               if(user){
                //  successMsg("login by facebook successful")
                 return user
               }
        }catch(err){
          errorMsg(err.message)
        }finally{
          setLoading(false)
        }
    }

  //  for reload problem solving and get user info---------
  useEffect(() => {
    const unSubscriber = onAuthStateChanged(auth, async (currentUser) => {
        setLoading(true)
      try {
        if (currentUser) {
            const res = await fetch("http://localhost:5000/jwt", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email: currentUser.email })
          })

          const data = await res.json();
          if (data.token) {
            localStorage.setItem("accessToken", data.token)
          }

         setUser(currentUser)
     
        }
      } catch (err) {
        errorMsg(err.message)
      }finally{
                 setLoading(false)
      }



    })
    return () => unSubscriber()
  }, [])

  const info = {
    register,
    loading,
    user,
    login,
    logOut,
    updateUser,
    loginByGoogle,
    loginByFB
  }
  return (
    <AuthContext.Provider value={info}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;