 
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";

 

const AllPet = () => {
      const axiosSecure=useAxiosSecure()
      const {data:allPetsData=[],isLoading,isError,error}=useQuery({
        queryKey:["allPetsData"],
        queryFn:async()=>{
            const res = await axiosSecure.get("/allPet")
            return res.data
        }
      })
      console.log(allPetsData)
      if(isLoading){
        return <Spinner isLoading={true}></Spinner>
      }
      if(isError){
        errorMsg(error.message)
      }
    return (
        <div>
            <h1>all pet-------------</h1>
        </div>
    );
};

export default AllPet;