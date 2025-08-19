import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { useMutation, useQueryClient } from "@tanstack/react-query";



const PauseBtn = ({ data }) => {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationKey: ["statusToggling"],
        mutationFn: async (newStatus) => {
            const res = await axiosSecure.patch(`cdcData/${data._id}/status`, { status: newStatus })
            return res.data
        },
        onSuccess: (res) => {
            successMsg(`status update to ${res.status}`)
            queryClient.invalidateQueries({
                queryKey: ["dpData", data.email.toLowerCase()],
            });
        },
         onError: (err) => {
            errorMsg(err.message)
        },
    })
       



const handleClick = () => {
    const newStatus = data.status === "Active" ? "Pause" : "Active"
    mutate(newStatus)
}
return (

    <div className={`${data.status === "Active" ? "bg-green-500" : "bg-red-500"}   px-3 rounded-full text-[#ffffff] `} >
        <button className="btn btn-ghost btn-xs"
            onClick={handleClick}
            disabled={isPending}
        >{data.status === "Active" ? "Pause" : "Active"}</button>
    </div>
);
};

export default PauseBtn;