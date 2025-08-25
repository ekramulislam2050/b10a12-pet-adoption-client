import useAuth from "@/Hooks/Auth/useAuth";
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";

const MyAddedPets = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: pets = [], isLoading, isError, error } = useQuery({
        queryKey: ["myAddedPet", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allDataByEmail?email=${user?.email}`)
            return res.data
        },
        enabled: !!user?.email
    })
    if (isLoading) {
        return <Spinner isLoading={isLoading}></Spinner>
    }
    if (isError) {
        return errorMsg(error.message)
    }
    // console.log(pets)
    // tanstack table column--------
     const columnHandler=createColumnHelper()
     const column=[
         columnHandler.display({
            id:"serial",
            header:"SL",
            cel:(info)=>info.row.index+1,
         }),
         columnHandler.accessor("name",{header:"Pet Name"}),
         columnHandler.accessor("category",{header:"Category"}),
         columnHandler.accessor("image",{
            header:"Image",
            cell:(info)=>(
                <img
                  src={info.getValue()}
                   alt="img"
                   className="object-cover rounded w-14 h-14"
                />
            )
         }),
         columnHandler.accessor("Adopted",{
            header:"Adoption Status",
            cell:(info)=>
                info.getValue()?(
                <span className="font-semibold text-green-500">Adopted</span>
            ):(
            <span className="font-semibold text-red-500">Not Adopted</span>
        )
            
         })
     ]
    
    return (
       <>
           
       </>
    );
};

export default MyAddedPets;