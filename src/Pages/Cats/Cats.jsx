import Heading from "@/Components/Heading/Heading";
import PetSwiper from "@/Components/Swiper/PetSwiper";
import useAllData from "@/Hooks/AllData/useAllData";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";


const Cats = () => {
  const {allData,isLoading,isError,error}=useAllData()
      if (isLoading) {
        return <Spinner isLoading={isLoading} />
    }
    if (isError) {
        errorMsg(error.message || "something went wrong")
        return null
    }
    //  console.log(allData)
    const cats = allData?.filter(pets => pets.category === "Cat" && pets.adopted === false)
  
    // console.log(dogs)
    return (

         <div className="mt-2">
             <div className="pt-5 pb-10">
                  <Heading headingMsg={"Available Cats"}></Heading>
             </div>
             <PetSwiper pets={cats}></PetSwiper>
             
         </div>

    );
};

export default Cats;