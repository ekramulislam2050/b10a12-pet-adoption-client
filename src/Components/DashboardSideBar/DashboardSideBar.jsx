import useAuth from "@/Hooks/Auth/useAuth";
import { NavLink } from "react-router-dom";


const DashboardSideBar = () => {
    const { user } = useAuth()
    const links = <>
        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/addPet"}>Add a pet</NavLink></li>
        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/myAddedPets"}>My added pets</NavLink></li>
        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/adoptionRequest"}>Adoption Request</NavLink></li>
        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/createDonationCampaign"}>Create Donation Campaign</NavLink></li>
        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/myDonationsCampaign"}>My Donation Campaigns</NavLink></li>
        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/myDonations"}>My Donations</NavLink></li>

    </>
    return (
        <div className="flex-col lg:h-screen shadow-sm navbar bg-[#0e5a4d] overflow-y-auto  ">
            <div className="flex-col navbar-start ">
                {/* user img------------ */}
                <div className="my-4 avatar avatar-online">
                    <div className="w-20 rounded-full ">
                        <img src={user?.photoURL} className="w-full h-20 border-2 shadow-md border-[#A47149] rounded-full   object-contain p-1" alt="img" />
                    </div>

                </div>
                {/* user name---------------- */}
                <p className="text-[#ffffff] ">{user?.displayName}</p>
                {/* divider------------ */}
                <div className="divider divider-warning"></div>

                {/* <div className="flex flex-col w-full lg:hidden">
                    <ul className="  text-center text-[#ffffff]  ">
                        {
                            links
                        }
                    </ul>
                </div> */}
               


            </div>
            <div className="hidden navbar-center lg:flex">
                <ul className="flex-col px-1 menu menu-horizontal text-[#ffffff]">
                    {
                        links
                    }
                </ul>
            </div>

        </div>
    );
};

export default DashboardSideBar;