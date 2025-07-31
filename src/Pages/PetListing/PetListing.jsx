import InfiniteScrolling from "@/Components/InfiniteScrolling/InfiniteScrolling";
import useAxiosPublic from "@/Hooks/AxiosPublic/useAxiosPublic";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";


const PetListing = () => {
    const axiosPublic=useAxiosPublic()
    const {data:availablePets=[],isLoading,isError,error}=useQuery({
        queryKey:["availablePets"],
        queryFn:async()=>{
            const res=await axiosPublic.get("/availablePets")
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
          <InfiniteScrolling data={availablePets} type='availablePets'></InfiniteScrolling>
        </div>
    );
};

export default PetListing;