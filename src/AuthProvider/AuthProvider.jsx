import auth from "@/firebaseConfig/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createContext, useState } from "react";

 
export  const AuthContext =createContext(null)
const AuthProvider = ({children}) => {
    const [user,setUser]=useState()
    const [loading,setLoading]=useState(true)

      const register=(email,password)=>{
        setLoading(true)
         return createUserWithEmailAndPassword(auth,email,password)
          
      }

    const info={
           register
    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;