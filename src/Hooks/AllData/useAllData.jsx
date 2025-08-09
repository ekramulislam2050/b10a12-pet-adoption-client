import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";


 

const useAllData = () => {
    const axiosSecure=useAxiosSecure()
    const {data:allData,isLoading,isError,error,refetch}=useQuery({
        queryKey:["allData"],
        queryFn:async()=>{
            const res = await axiosSecure.get("/allPet")
             return res.data
        }
    })
    
    return {allData,isLoading,isError,error,refetch}
};

export default useAllData;