import DashboardNavbar from "@/Components/DashboardNavbar/DashboardNavbar";
import DashboardSideBar from "@/Components/DashboardSideBar/DashboardSideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

    return (

        <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-3 ">
                <div className="lg:hidden">
                    <DashboardNavbar></DashboardNavbar>
                </div>
                <DashboardSideBar></DashboardSideBar>
            </div>
            <div className="lg:col-span-9 bg-[#054560]">
                <div className="hidden lg:block">
                    <DashboardNavbar></DashboardNavbar>
                </div>
                   <Outlet></Outlet>
       
        
            </div>

        </div>

    )
}




export default Dashboard;