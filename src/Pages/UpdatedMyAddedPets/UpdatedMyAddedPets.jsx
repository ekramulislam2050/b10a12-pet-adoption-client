import UpdatedForm from "@/Components/UpdatedForm/UpdatedForm";
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

 

const UpdatedMyAddedPets = () => {
    const axiosSecure=useAxiosSecure()
    const {id} = useParams()
    //  console.log(id)
    const {data:myAddedPets=[]}=useQuery({
        queryKey:["myAddedPets",id],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/allPet/${id}`)
            return res.data
        }
        
    })
    console.log(myAddedPets)
    return (
        <div>
            <UpdatedForm data={myAddedPets}></UpdatedForm>
        </div>
    );
};

export default UpdatedMyAddedPets;