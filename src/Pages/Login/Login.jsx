import useAuth from "@/Hooks/Auth/useAuth";
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { useFormik } from "formik"
import { Link, useLocation, useNavigate } from "react-router-dom";
import *as Yup from "yup"

const Login = () => {
      const axiosSecure=useAxiosSecure()
    const {login,loginByGoogle,loginByFB}=useAuth()
    const navigate = useNavigate()
    const location=useLocation()
    const from = location?.state?.from?.pathname || "/"


    // logged user data------------

    const saveToDB= async(loggedUser)=>{
            console.log("fb login==",loggedUser)
           try{
              const email=loggedUser?.email || "ekramulislam2050@gmail.com"
              const userInfo={
                  name:loggedUser?.displayName || "Guest User",
                  email:email,
                  image:loggedUser?.photoURL || "https://i.ibb.co/tj6ybPZ/faveIcon.png",
                  role:"user",
                  status:"active"
              }
                console.log("userInfo=",userInfo)
              const res=await axiosSecure.post("/loginUsers",userInfo)
                if(res.data){
                    successMsg("login success and save to db")
                }
           }catch(err){
              errorMsg(err.message)
           }
    }
     
    // use formik------------------
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        
        onSubmit: async(values) => {
            try{
               const result = await login(values.email,values.password)
                 if(result){
                   
                    await saveToDB(result)
                     navigate(from,{replace:true})
                 }
              
            }catch(err){
                errorMsg(err.message)
            }
            // console.log(values)
        },
        
        validationSchema: Yup.object({
            email:Yup.string().required(),
            password:Yup.string().min(6).required()
        })
     
    })

    // handle google login--------------
      const handleGoogleLogin = async()=>{
         try{
              const result = await loginByGoogle()
             
               if( result){
               await saveToDB(result)
                  navigate(from,{replace:true})
               }
         }catch(err){
            errorMsg(err.message)
         }
      }

    // handle facebook login---------------

    const handleFacebookLogin=async()=>{
       try{
          const result = await loginByFB()
          if(result){
            console.log("fb login=",result)
            await saveToDB(result)
            navigate(from,{replace:true})
          }
       }catch(err){
        errorMsg(err.message)
       }
    }
    
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-sm shadow-xl card border border-[#F3D6C2] bg-white">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center text-[#A47149]">Login to your account</h2>
                    <p className="mb-4 text-sm text-center text-gray-600">
                        Enter your email below to login to your account
                    </p>

                    <form onSubmit={formik.handleSubmit}>

                        {/* Email */}
                        <div className="mb-4 form-control">
                            <label className="label">
                                <span className="label-text text-[#4B3F3F]">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                className="input input-bordered"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-6 form-control">
                            <label className="flex justify-between label">
                                <span className="label-text text-[#4B3F3F]">Password</span>
                                <a href="#" className="text-sm link link-hover text-[#A47149]">Forgot password?</a>
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="input input-bordered"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500">{formik.errors.password}</p>
                            )}
                        </div>
                          <div className="my-1">
                             <Link to={"/register"}>
                                  <p className="flex items-center justify-center gap-1 text-sm"> Do not have an account?
                                  <span className="font-semibold text-red-500 underline">Register</span>    
                                
                               </p>
                             </Link>
                          </div>
                        <div className="form-control">
                            <button type="submit" className="w-full btn bg-[#A47149] text-white hover:bg-[#8c5e3d]">
                                Login
                            </button>
                        </div>
                    </form>
                      <div className="divider">OR</div>
                      {/* google login------------- */}
                      <div>
                          <button type="submit" className="w-full btn bg-[#A47149] text-white hover:bg-[#8c5e3d]" onClick={handleGoogleLogin}>
                                Login By Google
                            </button>
                      </div>
                      <div className="divider">OR</div>
                      {/* facebook login------------- */}
                      <div>
                          <button type="submit" className="w-full btn bg-[#A47149] text-white hover:bg-[#8c5e3d]" onClick={handleFacebookLogin}>
                                Login By Facebook
                            </button>
                      </div>

                </div>
            </div>
        </div>
    );
};

export default Login;