import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../../LayOut/MainLayOut/MainLayOut";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home";
import Login from "@/Pages/Login/Login";
import Register from "@/Pages/Register/Register";
import PetListing from "@/Pages/PetListing/PetListing";
import DonationCampaigns from "@/Pages/DonationCampaigns/DonationCampaigns";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import Dashboard from "@/Pages/Dashboard/Dashboard";
import Cats from "@/Pages/Cats/Cats";
import Dogs from "@/Pages/Dogs/Dogs";
import Rabbits from "@/Pages/Rabbits/Rabbits";
import Fish from "@/Pages/Fish/Fish";
import PetCareTipsDetails from "@/Pages/PetCareTipsDetails/PetCareTipsDetails";
import PetDetails from "@/Pages/PetDetails/PetDetails";
import DashboardError from "@/Pages/DashboardError/DashboardError";
import AddPet from "@/Components/AddPet/AddPet";
import MyAddedPets from "@/Components/MyAddedPets/MyAddedPets";
import AdoptionRequest from "@/Components/AdoptionRequest/AdoptionRequest";
import CreateDonationCampaigns from "@/Components/CreateDonationCampaigns/CreateDonationCampaigns";
import MyDonationCampaigns from "@/Components/MyDonationCampaigns/MyDonationCampaigns";
import MyDonations from "@/Components/MyDonations/MyDonations";
import DonationCampaignDetails from "@/Components/DonationCampaignDetail/DonationCampaignDetails";
import RecommendationDonationDetails from "@/Pages/RecommendedDonationDetails/RecommendationDonationDetails";
import UpdatedMyAddedPets from "@/Pages/UpdatedMyAddedPets/UpdatedMyAddedPets";
import AllUser from "@/Components/AllUser/AllUser";
import AllPet from "@/Components/AllPet/AllPet";
import AllDonation from "@/Components/AllDonation/AllDonation";
import AdminRouter from "../AdminRouter/AdminRouter";
import DashboardHome from "@/Components/DashboardHome/DashboardHome";
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";




const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut></MainLayOut>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/petListing",
                element: <PetListing></PetListing>
            },
            {
                path: "/donationCampaigns",
                element: <DonationCampaigns></DonationCampaigns>
            },
            {
                path: "/donationCampaigns/:id",
                element: <PrivateRouter> <DonationCampaignDetails></DonationCampaignDetails></PrivateRouter>,
                loader: async ({ params }) => {
                    const token = localStorage.getItem("access-token")
                    const res = await fetch(`http://localhost:5000/cdcData/${params.id}`, { headers: { Authorization: `Bearer ${token}` } })
                    const data = await res.json()
                    return data
                }
            },
            {
                path: "/cats",
                element: <Cats></Cats>
            },
            {
                path: "/dogs",
                element: <Dogs></Dogs>
            },
            {
                path: "/rabbits",
                element: <Rabbits></Rabbits>
            },
            {
                path: "/fish",
                element: <Fish></Fish>
            },
            {
                path: "/petCareTipsDetails",
                element: <PetCareTipsDetails></PetCareTipsDetails>
            },
            {
                path: '/petDetails/:id',
                element: <PrivateRouter> <PetDetails></PetDetails></PrivateRouter>,
                loader: ({ params }) => fetch(`http://localhost:5000/allpet/${params.id}`)
            },
            {
                path: "/recommendedDonationDetails/:id",
                element: <PrivateRouter><RecommendationDonationDetails></RecommendationDonationDetails></PrivateRouter>,
                loader:async ({ params }) => {
                    const token=localStorage.getItem("access-token")
                    const res = await fetch(`http://localhost:5000/recommended_donation/${params.id}`,{headers:{Authorization:`Bearer ${token}`}})
                    const data= await res.json()
                    return data
                    
                }
            }
        ]
    },

    // dashboard---------------
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        errorElement: <DashboardError></DashboardError>,
        children: [
            // default path-----------
            {
                path: "/dashboard",
                element: <DashboardHome></DashboardHome>
            },
            // user--------------

            {
                path: "/dashboard/addPet",
                element: <PrivateRouter><AddPet></AddPet></PrivateRouter>
            },
            {
                path: "/dashboard/myAddedPets",
                element: <PrivateRouter><MyAddedPets></MyAddedPets></PrivateRouter>
            },
            {
                path: "/dashboard/adoptionRequest",
                element: <PrivateRouter><AdoptionRequest></AdoptionRequest></PrivateRouter>
            },
            {
                path: "/dashboard/createDonationCampaign",
                element: <PrivateRouter><CreateDonationCampaigns></CreateDonationCampaigns></PrivateRouter>
            },
            {
                path: "/dashboard/myDonationsCampaign",
                element: <PrivateRouter><MyDonationCampaigns></MyDonationCampaigns></PrivateRouter>
            },
            {
                path: "/dashboard/myDonations",
                element: <PrivateRouter><MyDonations></MyDonations></PrivateRouter>
            },
            {
                path: "/dashboard/updatedMyAddedPets/:id",
                element: <PrivateRouter><UpdatedMyAddedPets></UpdatedMyAddedPets></PrivateRouter>,
                loader: ({ params }) => fetch(`http://localhost:5173/dashboard/myAddedPets/${params.id}`)
            },
            // admin--------

            {
                path: "/dashboard/allUser",
                element: <AdminRouter><AllUser></AllUser></AdminRouter>
            },
            {
                path: "/dashboard/allPet",
                element: <AdminRouter><AllPet></AllPet></AdminRouter>
            },
            {
                path: "/dashboard/allDonation",
                element: <AdminRouter> <AllDonation></AllDonation></AdminRouter>
            }
        ]
    },

    // admin----------
    // {
    //     path: "/dashboard/admin",
    //     element: <Dashboard></Dashboard>,
    //     errorElement: <DashboardError></DashboardError>,
    //     children: [


    //     ]
    // }
])
export default router;