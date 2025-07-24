import { Link, useRouteError } from "react-router-dom";
import errImg from "../../assets/ErrorImg/222626-P21LCY-459.jpg"
const DashboardError = () => {
    const err = useRouteError()
    return (
        <div className="flex flex-col items-center py-5">
            <div className=" w-96">
                <img src={errImg} alt="errImg" className="w-full rounded-xl" />
            </div>
            <div className="flex flex-col items-center py-2">
                <h1 className="text-3xl font-semibold text-red-600">Oops!something went wrong</h1>
                <p className="text-xl font-semibold text-center">{err.statusText || err.message || "We can not find the page  you are looking for"}</p>
                <Link className="py-2" to={"/"}>
                    <button className="btn bg-[#f7a617] text-[#ffffff] text-lg rounded-full"><span className="animate-pulse">⬅️</span>Go Back Home</button>
                </Link>
            </div>
        </div>
    );
};

export default DashboardError;