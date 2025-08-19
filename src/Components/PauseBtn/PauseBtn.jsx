import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


const PauseBtn = ({ data }) => {
    const axiosSecure = useAxiosSecure()
    const [newStatus, setNewStatus] = useState()
    const { data: pauseData = {}, isLoading, isError, error } = useQuery({
        queryKey: ['pauseData', data._id],
        queryFn: async () => {
            const res = await axiosSecure.patch(`/cdcData/${data._id}/status`, { status: newStatus })
            return res.data
        }
    })
    console.log("pauseBtn=",pauseData)
    if (isLoading) {
        return <Spinner isLoading={isLoading}></Spinner>
    }
    if (isError) {
        return errorMsg(error.message)
    }
    const handleClick = () => {
        const status = data.status === "Active" ? "Pause" : "Active"
        setNewStatus(status)
    }
    return (

        <div className={`${data.status === "active" ? "bg-green-500" : "bg-red-500"}   px-3 rounded-full`} >
            <button className="text-black btn btn-ghost btn-xs"
                onClick={handleClick}
            >Pause</button>
        </div>
    );
};

export default PauseBtn;