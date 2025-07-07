import AboutUs from "@/Components/AboutUs/AboutUs";
import Banner from "@/Components/Banner/Banner";
import Category from "@/Components/Category/Category";
import Inspiration from "@/Components/Inspiration/Inspiration";
import PetCare from "@/Components/PetCare/PetCare";


 const Home = () => {
    return (
        <div className="overflow-hidden">
            <Banner></Banner>
            <Category></Category>
            <Inspiration></Inspiration>
            <AboutUs></AboutUs>
            <PetCare></PetCare>
        </div>
    );
};

export default Home;