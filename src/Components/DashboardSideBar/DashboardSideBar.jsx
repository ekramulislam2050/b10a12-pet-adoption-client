import useAuth from "@/Hooks/Auth/useAuth";
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";



const DashboardSideBar = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data = [], isLoading, isError, error } = useQuery({
        queryKey: ['loginUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get("/loginUsers")
            return res.data
        }
    })
    const loginUsers = data.find((loggedUser) => loggedUser?.email === user?.email)

    console.log(loginUsers)
    //   loginUsers.role="admin"
    const links = (
        <>
            {/* user--------------- */}
            {
                loginUsers?.role === "user" && (
                  
                    <>
                      
                        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/addPet"}>Add a pet</NavLink></li>
                        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/myAddedPets"}>My added pets</NavLink></li>
                        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/adoptionRequest"}>Adoption Request</NavLink></li>
                        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/createDonationCampaign"}>Create Donation Campaign</NavLink></li>
                        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/myDonationsCampaign"}>My Donation Campaigns</NavLink></li>
                        <li className="border border-[#07c19f] mb-5 rounded-full"><NavLink to={"/dashboard/myDonations"}>My Donations</NavLink></li>
                    </>
                )
            }



            {/* admin--------------- */}
            {
                loginUsers?.role == "admin" && (
                    <>
                        <li className="border border-[#07c19f] mb-5 rounded-full sm:px-10"><NavLink to={"/dashboard/admin/allUser"}>All User</NavLink></li>
                        <li className="border border-[#07c19f] mb-5 rounded-full sm:px-10"><NavLink to={"/dashboard/admin/allPet"}>All Pet</NavLink></li>
                        <li className="border border-[#07c19f] mb-5 rounded-full  sm:pl-5"><NavLink to={"/dashboard/admin/allDonation"}>All Donation</NavLink></li>

                    </>
                )
            }

           {/* banned user------------- */}
           <>
              {
                loginUsers?.role === "banned" && (
                     <p className="mt-5 text-center text-red-500">  ❌ Your account is banned.</p>
                )
              }
           </>


        </>
    )
    if (isLoading) {
        return <Spinner isLoading={isLoading}></Spinner>
    }
    if (isError) {
        return errorMsg(error.message)
    }
    if (!loginUsers) {
        return <Spinner isLoading={true}></Spinner>
    }

    return (
        <div className="flex-col lg:h-screen shadow-sm navbar bg-[#0e5a4d] overflow-y-auto  ">
            <div className="flex-col navbar-start ">
                {/* user img------------ */}
                <div className="my-4 avatar avatar-online">
                    <div className="w-20 rounded-full ">
                        <img src={loginUsers?.image} className="w-full h-20 border-2 shadow-md border-[#A47149] rounded-full   object-contain p-1" alt="img" />
                    </div>

                </div>
                {/* user name---------------- */}
                <p className="text-[#ffffff] ">{loginUsers?.name}</p>
                {/* divider------------ */}
                <div className="divider divider-warning"></div>




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