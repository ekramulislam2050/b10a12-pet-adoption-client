import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

 

const Cats = () => {
        const axiosSecure=useAxiosSecure()
        const {data:allPet,isLoading,isError}=useQuery({
            queryKey:["allPet"],
            queryFn:async()=>{
                const res = await axiosSecure.get("/allPet")
                 return res.data
            }
    
        })
         const cats = allPet?.filter(pet=>pet.category === "Cat")
        console.log(cats)
    return (
        <div>
            <h1>cate category page</h1>
        </div>
    );
};

export default Cats;