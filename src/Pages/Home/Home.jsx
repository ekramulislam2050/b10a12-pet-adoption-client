import AboutUs from "@/Components/AboutUs/AboutUs";
import Banner from "@/Components/Banner/Banner";
import Category from "@/Components/Category/Category";
import Inspiration from "@/Components/Inspiration/Inspiration";


 const Home = () => {
    return (
        <div className="overflow-hidden">
            <Banner></Banner>
            <Category></Category>
            <Inspiration></Inspiration>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;