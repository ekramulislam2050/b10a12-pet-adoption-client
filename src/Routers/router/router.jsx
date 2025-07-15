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
 


const router =createBrowserRouter([
    {
        path:"/",
        element:<MainLayOut></MainLayOut>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/register",
                element:<Register></Register>
            },
            {
                path:"/petListing",
                element:<PetListing></PetListing>
            },
            {   
                path:"/donationCampaigns",
                element:<PrivateRouter><DonationCampaigns></DonationCampaigns></PrivateRouter>
            },
            {
                path:"/dashboard",
                element:<Dashboard></Dashboard>
            },
            {
                path:"/cats",
                element:<Cats></Cats>
            },
            {
                path:"/dogs",
                element:<Dogs></Dogs>
            },
            {
                path:"/rabbits",
                element:<Rabbits></Rabbits>
            },
            {
                path:"/fish",
                element:<Fish></Fish>
            },
            {
                path:"/petCareTipsDetails",
                element:<PetCareTipsDetails></PetCareTipsDetails>
            },
            {
                path:'/petDetails/:id',
                element:<PetDetails></PetDetails>,
                loader:({params})=>fetch(`http://localhost:5000/allpet/${params.id}`)
            }
        ]
    }
]) 
export default router;