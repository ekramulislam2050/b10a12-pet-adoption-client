
import { Link } from 'react-router-dom';

const Register = () => {

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(e.target)
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#FFF1F4]">
            <div className="w-full max-w-sm shadow-xl card bg-white border border-[#F3D6C2]">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center text-[#A47149]">Register to your account</h2>
                    <p className="mb-4 text-sm text-center text-gray-600">
                        Enter your email below to register to your account
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="mb-4 form-control">
                            <label className="label">
                                <span className="label-text text-[#4B3F3F]">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        {/* Image URL */}
                        <div className="mb-4 form-control">
                            <label className="label">
                                <span className="label-text text-[#4B3F3F]">Image URL</span>
                            </label>
                            <input
                                type="text"
                                placeholder="https://your-image.jpg"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4 form-control">
                            <label className="label">
                                <span className="label-text text-[#4B3F3F]">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="m@example.com"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-6 form-control">
                            <label className="flex justify-between label">
                                <span className="label-text text-[#4B3F3F]">Password</span>
                                <a href="#" className="text-sm link link-hover text-[#A47149]">Forgot password?</a>
                            </label>
                            <input type="password" className="input input-bordered" required />
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