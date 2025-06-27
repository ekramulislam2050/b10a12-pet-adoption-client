import PetSwiper from "@/Components/Swiper/PetSwiper";
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";



const Cats = () => {
    const axiosSecure = useAxiosSecure()
    const { data: allPet, isLoading, isError, error } = useQuery({
        queryKey: ["allPet"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allPet")
            return res.data
        }

    })
    if (isLoading) {
        return <Spinner isLoading={isLoading} />
    }
    if (isError) {
        errorMsg(error.message || "something went wrong")
        return null
    }
    const cats = allPet?.filter(pet => pet.category === "Cat")
    console.log(cats)
    return (
        <div>
             <PetSwiper pets={cats}></PetSwiper>
        </div>
    );
};

export default Cats;