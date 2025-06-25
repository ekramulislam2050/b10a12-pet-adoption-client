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
            }
        ]
    }
]) 
export default router;