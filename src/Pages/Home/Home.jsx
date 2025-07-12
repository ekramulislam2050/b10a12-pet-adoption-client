import AboutUs from "@/Components/AboutUs/AboutUs";
import Banner from "@/Components/Banner/Banner";
import Category from "@/Components/Category/Category";
import CategorySpotlight from "@/Components/CategorySpotlight/CategorySpotlight";
import Inspiration from "@/Components/Inspiration/Inspiration";
import PetCare from "@/Components/PetCare/PetCare";
import SuccessChart from "@/Components/SuccessChart/SuccessChart";


 const Home = () => {
    return (
        <div className="overflow-hidden">
            <Banner></Banner>
            <Category></Category>
             <CategorySpotlight></CategorySpotlight>
            <Inspiration></Inspiration>
            <AboutUs></AboutUs>
            <PetCare></PetCare>
            <SuccessChart></SuccessChart>
        </div>
    );
};

export default Home;