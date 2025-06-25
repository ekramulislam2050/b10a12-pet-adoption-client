import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo/logo.png.png'
import useAuth from "@/Hooks/Auth/useAuth";
import { IoMdArrowDropdownCircle } from "react-icons/io";
const Navbar = () => {
    const { user, logOut } = useAuth()
    console.log(user)
    const links = <>
        <li className="hover:text-[#A47149]"><NavLink to={"/"}>Home</NavLink></li>
        <li className="hover:text-[#A47149]"><NavLink to={"/petListing"}>PetListing</NavLink></li>
        <li className="hover:text-[#A47149]"><NavLink to={"/donationCampaigns"}>Donation Campaigns</NavLink></li>





    </>
    return (
        <div className="shadow-sm navbar bg-[#FADADD] text-[#333333]">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="p-2 mt-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box z-1 w-52">
                        {links}
                    </ul>
                </div>
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="adoptNest logo" className="w-14 h-14 border shadow-md border-[#A47149] rounded-full   object-contain p-1" />
                    <a className="text-2xl font-extrabold tracking-tighter text-[#A47149]">AdoptNest</a>
                </div>
            </div>
            <div className="hidden navbar-center lg:flex">
                <ul className="px-1 menu menu-horizontal">
                    {
                        links
                    }
                </ul>
            </div>

            {/* toggle login logout--------------- */}
            <div className="navbar-end">
                <div className="pr-1">
                    {
                        !user ?
                            <button className="hover:text-[#A47149]"><NavLink to={"/login"}>Login</NavLink></button> : ""
                            
                    }
                </div>
                {/* user img dropdown menu---------------- */}
                {
                    user && <div className="flex items-center justify-center gap-1">
                        <div className="avatar avatar-online ">
                            <div className="rounded-full w-14 ">
                                <img src={user?.photoURL} className="w-14 h-14 border-2 shadow-md border-[#A47149] rounded-full   object-contain p-1" />
                            </div>

                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button">
                                <IoMdArrowDropdownCircle className="text-xl text-[#A47149]" />
                            </div>
                            <ul tabIndex={0} className="mt-8 p-2 shadow-sm dropdown-content menu bg-[#A47149] rounded-box z-1 w-52">
                                <li><Link to={"/dashboard"} className="text-[#fff] cursor-pointer">Dashboard</Link></li>
                                <li>
                                    <button className="text-[#fff] cursor-pointer" onClick={logOut}>LogOut</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                }

            </div>


        </div>
    );
};

export default Navbar;