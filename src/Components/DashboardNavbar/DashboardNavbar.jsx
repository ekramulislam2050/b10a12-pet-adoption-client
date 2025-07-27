import useAuth from "@/Hooks/Auth/useAuth";
import { RiArrowDropDownLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
    const navigate=useNavigate()
    const {logOut}=useAuth()
    const handleLogOut=()=>{
        logOut()
        navigate("/")
    }
    const links = <>
        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/addPet"}>Add a pet</NavLink></li>
        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/myAddedPets"}>My added pets</NavLink></li>
        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/adoptionRequest"}>Adoption Request</NavLink></li>
        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/createDonationCampaign"}>Create Donation Campaign</NavLink></li>
        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/myDonationsCampaign"}>My Donation Campaigns</NavLink></li>
        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/myDonations"}>My Donations</NavLink></li>

    </>
    return (
        <div className="shadow-sm navbar bg-gradient-to-l from-[#0e5a4d] to-[#054560]    ">
            <div className="navbar-start">

            </div>
            <div className="navbar-center">
                <a className="text-xl text-[#ffffff]  btn-ghost flex">
                    User Dashboard

                </a>
                {/* navigation dropdown---------- */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className=" btn-ghost">

                        <RiArrowDropDownLine className="text-4xl text-orange-300 lg:hidden" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="p-2 mt-5 shadow z-1 menu menu-sm dropdown-content bg-[#0e5a4d]  rounded-box w-52  text-[#ffffff] border border-[#07c19f] right-0">
                        {
                            links
                        }
                    </ul>
                </div>

            </div>
            <div className="navbar-end ">
                <div className="dropdown text-[#ffffff]  ">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="right-0 p-2 mt-3 shadow menu menu-sm dropdown-content  bg-[#0e5a4d]  rounded-box z-1 w-52 border border-[#07c19f]">
                          <NavLink to={"/"}>
                              <li>Homepage</li>
                          </NavLink>
                          <li onClick={handleLogOut} className="cursor-pointer">LogOut</li>
                         
                        
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default DashboardNavbar;