import Heading from "@/Components/Heading/Heading";
import PetSwiper from "@/Components/Swiper/PetSwiper";
import useAllData from "@/Hooks/AllData/useAllData";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";

 

const Fish = () => {
    const {allData ,isLoading,isError,error}=useAllData()
     if(isLoading){
        return <Spinner isLoading={isLoading}></Spinner>
     }
     if(isError){
        errorMsg(error.message || "something went wrong")
        return null
     }
     const fishes = allData.filter(pets=>pets.category === "Fish")
    return (
        <div className="mt-2">
            <div className="pt-5 pb-10">
                  <Heading headingMsg={"Available Fish"}></Heading>
             </div>
             <PetSwiper pets={fishes}></PetSwiper>
        </div>
    );
};

export default Fish;