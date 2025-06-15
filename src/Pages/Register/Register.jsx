import useAuth from "@/Hooks/Auth/useAuth";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import *as Yup from "yup"


const Register = () => {
    const { register } = useAuth()

    const formik = useFormik({
        initialValues: {
            name: "",
            imageURL: "",
            email: '',
            password: ""
        },

        validationSchema: Yup.object({
            name: Yup.string().required(),
            imageURL: Yup.string().url().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required()
        }),
        onSubmit: (values) => {
            register(values.email, values.password)
                .then(result => {
                    const user = result.user
                    if (user) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "user successfully created",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }

                })
                .catch(err => {
                    const errMsg = err.message
                    if (errMsg) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: errMsg,
                            footer: '<a href="#">Why do I have this issue?</a>'
                        });
                    }
                })

        },

    })

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-sm shadow-xl card border border-[#F3D6C2] bg-white">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center text-[#A47149]">Register to your account</h2>
                    <p className="mb-4 text-sm text-center text-gray-600">
                        Enter your email below to register to your account
                    </p>

                    <form onSubmit={formik.handleSubmit}>
                        {/* Name */}
                        <div className="mb-4 form-control">
                            <label className="label">
                                <span className="label-text text-[#4B3F3F]">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your name"
                                className="input input-bordered"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500">{formik.errors.name}</p>
                            )}
                        </div>

                        {/* Image URL */}
                        <div className="mb-4 form-control">
                            <label className="label">
                                <span className="label-text text-[#4B3F3F]">Image URL</span>
                            </label>
                            <input
                                type="text"
                                name="imageURL"
                                placeholder="https://your-image.jpg"
                                className="input input-bordered"
                                onChange={formik.handleChange}
                                value={formik.values.imageURL}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.imageURL && formik.errors.imageURL && (
                                <p className="text-red-500">{formik.errors.imageURL}</p>
                            )}
                        </div>

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

                        <div className="form-control">
                            <button type="submit" className="w-full btn bg-[#A47149] text-white hover:bg-[#8c5e3d]">
                                Register
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default Register;