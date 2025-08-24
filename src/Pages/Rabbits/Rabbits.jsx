import useAllData from "@/Hooks/AllData/useAllData";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";

import PetSwiper from "@/Components/Swiper/PetSwiper";
import Heading from "@/Components/Heading/Heading";

 

const Rabbits = () => {
    const {allData,isLoading,isError,error}=useAllData()
    if(isLoading){
        return <Spinner isLoading={isLoading}></Spinner>
    }
    if(isError){
        errorMsg(error.message || "something went wrong")
        return null
    }
    const rabbits = allData.filter(pets=>pets.category === "Rabbit" && pets.adopted===false)
    return (
        <div className="mt-2">
            <div className="pt-5 pb-10">
                  <Heading headingMsg={"Available Rabbits"}></Heading>
             </div>
              <PetSwiper pets={rabbits}></PetSwiper>
        </div>
    );
};

export default Rabbits;