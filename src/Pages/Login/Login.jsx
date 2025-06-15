import { useFormik } from "formik"
import { Link } from "react-router-dom";
import *as Yup from "yup"

const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            console.log(values)
        },
        validationSchema: Yup.object({
            email:Yup.string().required(),
            password:Yup.string().min(6).required()
        })
     
    })
    
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
                                  <p className="flex items-center justify-center">have an account?
                                  <span className="text-red-500">Register</span>    
                                
                               </p>
                             </Link>
                          </div>
                        <div className="form-control">
                            <button type="submit" className="w-full btn bg-[#A47149] text-white hover:bg-[#8c5e3d]">
                                Login
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default Login;