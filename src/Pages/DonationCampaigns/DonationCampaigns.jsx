import InfiniteScrolling from "@/Components/InfiniteScrolling/InfiniteScrolling";

import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
 
import { useQuery } from "@tanstack/react-query";

 
 
 const DonationCampaigns = () => {
      const axiosSecure=useAxiosSecure()
    const {data:cdcData=[],isLoading,isError,error, }=useQuery({
        queryKey:["cdcData"],
        queryFn:async()=>{
            const res=await axiosSecure.get("/cdcData")
             return res.data
        }
    })
 
    if(isLoading){
        return <Spinner isLoading={isLoading}></Spinner>
    }
    if(isError){
        return errorMsg(error.message)
    }
    return (
        <div>
             <InfiniteScrolling data={cdcData} type='cdcData'></InfiniteScrolling>
        </div>
    );
 };
 
 export default DonationCampaigns;