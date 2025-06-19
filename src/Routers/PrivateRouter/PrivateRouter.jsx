import useAuth from "@/Hooks/Auth/useAuth";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRouter = ({children}) => {
    const { loading, user } = useAuth()
    const location = useLocation()
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <p>Loading..............</p>
            <span className="loading loading-spinner text-error"></span>
        </div>
    }
    if (!user) {
        return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
    }
    return children
};

export default PrivateRouter;