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
                element: <PrivateRouter><DonationCampaigns></DonationCampaigns></PrivateRouter>
            },
            {
                path: "/donationCampaigns/:id",
                element: <DonationCampaignDetails></DonationCampaignDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/cdcData/${params.id}`)
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
                element: <PetDetails></PetDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/allpet/${params.id}`)
            },
            {
                path: "/recommendedDonationDetails/:id",
                element: <RecommendationDonationDetails></RecommendationDonationDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/recommended_donation/ ${params.id}`)
            }
        ]
    },
    // normal user---------------
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        errorElement: <DashboardError></DashboardError>,
        children: [
            {
               path: "/dashboard",
                element: <PrivateRouter><AddPet></AddPet></PrivateRouter>
            },
            {
                path: "/dashboard/addPet",
                element: <PrivateRouter><AddPet></AddPet></PrivateRouter>
            },
            {
                path: "/dashboard/myAddedPets",
                element: <MyAddedPets></MyAddedPets>
            },
            {
                path: "/dashboard/adoptionRequest",
                element: <AdoptionRequest></AdoptionRequest>
            },
            {
                path: "/dashboard/createDonationCampaign",
                element: <CreateDonationCampaigns></CreateDonationCampaigns>
            },
            {
                path: "/dashboard/myDonationsCampaign",
                element: <MyDonationCampaigns></MyDonationCampaigns>
            },
            {
                path: "/dashboard/myDonations",
                element: <MyDonations></MyDonations>
            },
            {
                path: "/dashboard/updatedMyAddedPets/:id",
                element: <UpdatedMyAddedPets></UpdatedMyAddedPets>,
                loader: (params) => fetch(`http://localhost:5173/dashboard/myAddedPets/${params.id}`)
            }
        ]
    },
    {
        path: "/dashboard/admin",
        element: <Dashboard></Dashboard>,
        errorElement: <DashboardError></DashboardError>,
        children: [
            {
                 path: "/dashboard/admin",
                element: <AllUser></AllUser>
            },
            {
                path: "allUser",
                element: <AllUser></AllUser>
            },
            {
                path: "allPet",
                element: <AllPet></AllPet>
            },
            {
                path: "allDonation",
                element: <AllDonation></AllDonation>
            }
        ]
    }
])
export default router;