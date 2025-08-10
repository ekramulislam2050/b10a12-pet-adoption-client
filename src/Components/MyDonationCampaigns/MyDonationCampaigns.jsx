import useAuth from "@/Hooks/Auth/useAuth";
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";

 

const MyDonationCampaigns = () => {
    const {user}=useAuth()
     const email=user?.email?.toLowerCase()
     
    const axiosSecure=useAxiosSecure()
      const {data:dpData=[],isError,isLoading,error}=useQuery({
        queryKey:["dpData",email],
        queryFn:async()=>{
            const res = await axiosSecure.get('/donationPayment',{params:{email}})
            return res.data
        
        },
              enabled: !!email,
              staleTime:0
      })
       if(!email){
        return
      }
       console.log(dpData)
      if(isLoading){
        return <Spinner isLoading={isLoading}></Spinner>
      }
      if(isError){
        return errorMsg(error.message)
      }
    return (
        <div>
            <h1 className="text-white">my donation campaigns-----------{dpData.length}</h1>
        </div>
    );
};

export default MyDonationCampaigns;