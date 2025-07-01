import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";

 

const useAllData = () => {
    const axiosSecure=useAxiosSecure()
    const {data:allData,isLoading,isError,error}=useQuery({
        queryKey:["allData"],
        queryFn:async()=>{
            const res = await axiosSecure.get("/allPet")
             return res.data
        }
    })
    
    return {allData,isLoading,isError,error}
};

export default useAllData;